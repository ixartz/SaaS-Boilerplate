import { Client } from 'pg';

async function seedOwner() {
  // eslint-disable-next-line no-console
  console.log('🌱 Starting owner seed...');

  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:Khacbiet1!@localhost:5432/siteflow_dev',
  });

  try {
    await client.connect();
    // eslint-disable-next-line no-console
    console.log('✅ Connected to database');

    // Get CLERK_USER_ID from environment
    const clerkUserId = process.env.SEED_OWNER_CLERK_ID;

    if (!clerkUserId) {
      throw new Error('SEED_OWNER_CLERK_ID environment variable is required');
    }

    // eslint-disable-next-line no-console
    console.log(`🔑 Using Clerk User ID: ${clerkUserId}`);

    // 1. Create or get user
    const userResult = await client.query(`
      INSERT INTO users (clerk_user_id, email, display_name)
      VALUES ($1, $2, $3)
      ON CONFLICT (clerk_user_id) DO UPDATE SET
        email = EXCLUDED.email,
        display_name = EXCLUDED.display_name
      RETURNING id, clerk_user_id, email, display_name;
    `, [clerkUserId, 'owner@siteflow.com', 'SiteFlow Owner']);

    const userId = userResult.rows[0].id;
    // eslint-disable-next-line no-console
    console.log(`✅ User created/updated: ${userResult.rows[0].email}`);

    // 2. Get existing organization (use the one from Phase 1)
    const orgResult = await client.query(`
      SELECT id, name, slug FROM organization WHERE id = $1
    `, ['org_sample_123']);

    if (orgResult.rows.length === 0) {
      throw new Error('Organization org_sample_123 not found. Please run Phase 1 seed first.');
    }

    const orgId = orgResult.rows[0].id;

    // eslint-disable-next-line no-console
    console.log(`✅ Organization created/updated: ${orgResult.rows[0].name}`);

    // 3. Create or update membership with OWNER role
    const membershipResult = await client.query(`
      INSERT INTO memberships (user_id, org_id, role, is_active)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (user_id, org_id) DO UPDATE SET
        role = EXCLUDED.role,
        is_active = EXCLUDED.is_active,
        updated_at = NOW()
      RETURNING id, role, is_active;
    `, [userId, orgId, 'OWNER', true]);

    // eslint-disable-next-line no-console
    console.log(`✅ Membership created/updated: ${membershipResult.rows[0].role}`);

    // 4. Create additional test users with different roles
    const testUsers = [
      { clerkId: 'user_admin_123', email: 'admin@siteflow.com', name: 'Admin User', role: 'ADMIN' },
      { clerkId: 'user_pm_123', email: 'pm@siteflow.com', name: 'PM User', role: 'PM' },
      { clerkId: 'user_engineer_123', email: 'engineer@siteflow.com', name: 'Engineer User', role: 'ENGINEER' },
      { clerkId: 'user_accountant_123', email: 'accountant@siteflow.com', name: 'Accountant User', role: 'ACCOUNTANT' },
      { clerkId: 'user_viewer_123', email: 'viewer@siteflow.com', name: 'Viewer User', role: 'VIEWER' },
    ];

    for (const testUser of testUsers) {
      // Create test user
      const testUserResult = await client.query(`
        INSERT INTO users (clerk_user_id, email, display_name)
        VALUES ($1, $2, $3)
        ON CONFLICT (clerk_user_id) DO UPDATE SET
          email = EXCLUDED.email,
          display_name = EXCLUDED.display_name
        RETURNING id;
      `, [testUser.clerkId, testUser.email, testUser.name]);

      const testUserId = testUserResult.rows[0].id;

      // Create membership
      await client.query(`
        INSERT INTO memberships (user_id, org_id, role, is_active)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id, org_id) DO UPDATE SET
          role = EXCLUDED.role,
          is_active = EXCLUDED.is_active
      `, [testUserId, orgId, testUser.role, true]);

      // eslint-disable-next-line no-console
      console.log(`✅ Test user created: ${testUser.email} (${testUser.role})`);
    }

    // eslint-disable-next-line no-console
    console.log('🎉 Owner seed completed successfully');
    // eslint-disable-next-line no-console
    console.log(`📊 Summary:
   - Owner User ID: ${userId}
   - Organization ID: ${orgId}
   - Owner Role: OWNER
   - Test Users: ${testUsers.length} users with different roles`);

    // Return data for verification
    return {
      orgId,
      userId,
      clerkUserId,
      testUsers: testUsers.map(u => ({ clerkId: u.clerkId, role: u.role })),
    };
  } catch (error) {
    console.error('❌ Owner seed failed:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Run if called directly
if (require.main === module) {
  seedOwner()
    .then((result) => {
      // eslint-disable-next-line no-console
      console.log('✅ Seed completed:', result);
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seed failed:', error);
      process.exit(1);
    });
}

export default seedOwner;
