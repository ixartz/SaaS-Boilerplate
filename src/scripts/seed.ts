/* eslint-disable no-console */
import { Client } from 'pg';

async function seed() {
  console.log('🌱 Starting seed...');

  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:Khacbiet1!@localhost:5432/siteflow_dev',
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');

    // 1. Tạo organization mẫu
    const orgResult = await client.query(`
      INSERT INTO organization (id, stripe_customer_id, stripe_subscription_status)
      VALUES ('org_sample_123', 'cus_sample_123', 'active')
      ON CONFLICT (id) DO NOTHING
      RETURNING id
    `);
    console.log('✅ Organization created:', orgResult.rows[0]?.id || 'already exists');

    // 2. Tạo 30+ projects mẫu
    const projectNames = [
      'Dự án nhà phố 3 tầng',
'Chung cư cao cấp',
'Biệt thự ven sông',
'Nhà xưởng công nghiệp',
      'Trung tâm thương mại',
'Bệnh viện đa khoa',
'Trường học quốc tế',
'Khách sạn 5 sao',
      'Văn phòng cho thuê',
'Khu dân cư cao cấp',
'Nhà máy sản xuất',
'Kho bãi logistics',
      'Trung tâm hội nghị',
'Sân vận động',
'Bảo tàng nghệ thuật',
'Thư viện công cộng',
      'Trung tâm y tế',
'Nhà ga tàu điện',
'Cầu vượt sông',
'Đường cao tốc',
      'Khu du lịch sinh thái',
'Resort biển',
'Golf course',
'Sân bay tư nhân',
      'Nhà máy điện mặt trời',
'Trạm xử lý nước',
'Khu công nghệ cao',
'Trung tâm dữ liệu',
      'Nhà máy lọc dầu',
'Khu chế xuất',
'Cảng biển',
'Sân bay quốc tế',
      'Tòa nhà văn phòng',
'Chung cư tầm trung',
'Nhà phố liền kề',
'Biệt thự biển',
      'Khu đô thị mới',
'Trung tâm thương mại',
'Bệnh viện tư nhân',
'Trường đại học',
    ];

    const statuses = ['PLANNING', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED'];
    const projects = [];

    for (let i = 0; i < 35; i++) {
      const name = `${projectNames[i % projectNames.length]} ${i + 1}`;
      const status = statuses[i % statuses.length];
      const budget = 1000000000 + (i * 100000000); // 1B to 4.5B
      const startDate = new Date(2024, 0, 1 + (i * 10));
      const endDate = new Date(2024, 11, 31 - (i * 5));

      const projectResult = await client.query(`
        INSERT INTO projects (org_id, name, description, status, budget, start_date, end_date, address, client_name, client_contact)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id, name
      `, [
        'org_sample_123',
        name,
        `Mô tả chi tiết cho ${name}`,
        status,
        budget,
        startDate,
        endDate,
        `Địa chỉ ${i + 1}, TP.HCM`,
        `Khách hàng ${i + 1}`,
        `090${String(i).padStart(7, '0')}`,
      ]);

      projects.push(projectResult.rows[0]);
    }

    console.log('✅ Projects created:', projects.length);

    // 3. Tạo category mẫu cho project đầu tiên
    const categoryResult = await client.query(`
      INSERT INTO categories (org_id, project_id, name, description, budget, "order")
      VALUES ('org_sample_123', $1, 'Phần móng và tầng trệt', 'Thi công phần móng, tầng trệt và hầm', 800000000.00, 1)
      RETURNING id, name
    `, [projects[0].id]);
    console.log('✅ Category created:', categoryResult.rows[0].name);

    // 4. Tạo tasks mẫu cho project đầu tiên
    const tasksResult = await client.query(`
      INSERT INTO tasks (org_id, project_id, category_id, name, description, status, priority, estimated_hours, actual_hours, due_date, assigned_to, "order")
      VALUES 
        ('org_sample_123', $1, $2, 'Đào móng', 'Đào móng sâu 2m, rộng 1.5m', 'DONE', 1, 40, 45, '2024-02-15', 'user_123', 1),
        ('org_sample_123', $1, $2, 'Đổ bê tông móng', 'Đổ bê tông móng C25', 'IN_PROGRESS', 2, 24, 12, '2024-02-28', 'user_456', 2),
        ('org_sample_123', $1, $2, 'Xây tường tầng trệt', 'Xây tường gạch ống 20cm', 'WAITING', 1, 80, null, '2024-03-15', 'user_789', 3)
      RETURNING id, name
    `, [projects[0].id, categoryResult.rows[0].id]);
    console.log('✅ Tasks created:', tasksResult.rows.length);

    // 5. Tạo daily log mẫu cho project đầu tiên
    const dailyLogResult = await client.query(`
      INSERT INTO daily_logs (org_id, project_id, category_id, log_date, weather, temperature, notes, created_by)
      VALUES ('org_sample_123', $1, $2, '2024-02-20', 'Nắng', 28.5, 'Thời tiết tốt, tiến độ đúng kế hoạch', 'user_123')
      RETURNING id
    `, [projects[0].id, categoryResult.rows[0].id]);
    console.log('✅ Daily log created:', dailyLogResult.rows[0].id);

    // 6. Tạo daily log tasks mẫu
    const dailyLogTasksResult = await client.query(`
      INSERT INTO daily_log_tasks (org_id, daily_log_id, task_id, status, progress, notes, hours_worked)
      VALUES 
        ('org_sample_123', $1, $2, 'DONE', 100, 'Hoàn thành đào móng', 45),
        ('org_sample_123', $1, $3, 'IN_PROGRESS', 50, 'Đang đổ bê tông, tiến độ 50%', 12),
        ('org_sample_123', $1, $4, 'WAITING', 0, 'Chờ hoàn thành đổ bê tông móng', 0)
      RETURNING id
    `, [
      dailyLogResult.rows[0].id,
      tasksResult.rows[0].id, // Đào móng
      tasksResult.rows[1].id, // Đổ bê tông móng
      tasksResult.rows[2].id, // Xây tường tầng trệt
    ]);
    console.log('✅ Daily log tasks created:', dailyLogTasksResult.rows.length);

    console.log('🎉 Seed OK');
    console.log('📊 Summary:');
    console.log(`   - 1 Organization: org_sample_123`);
    console.log(`   - ${projects.length} Projects`);
    console.log(`   - 1 Category: ${categoryResult.rows[0].name}`);
    console.log(`   - ${tasksResult.rows.length} Tasks`);
    console.log(`   - 1 Daily Log`);
    console.log(`   - ${dailyLogTasksResult.rows.length} Daily Log Tasks`);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Chạy seed
seed()
  .then(() => {
    console.log('✅ Seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  });
