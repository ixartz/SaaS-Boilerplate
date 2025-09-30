// E2E Seed Script
import { db } from '@/libs/DB';
import { membershipsSchema, organizationSchema, usersSchema } from '@/models/Schema';

async function seedE2EData() {
  console.log('🌱 Seeding E2E data...');

  try {
    // Create E2E organization
    const [org] = await db
      .insert(organizationSchema)
      .values({
        id: 'org_e2e_default',
        name: 'E2E Test Organization',
        slug: 'e2e-test-org',
      })
      .onConflictDoNothing()
      .returning();

    console.log('✅ Organization created:', org?.id || 'already exists');

    // Create E2E user
    const [user] = await db
      .insert(usersSchema)
      .values({
        id: 'user_e2e_owner',
        clerkUserId: 'clerk_e2e_owner',
        email: 'e2e@test.com',
        displayName: 'E2E Test User',
      })
      .onConflictDoNothing()
      .returning();

    console.log('✅ User created:', user?.id || 'already exists');

    // Create E2E membership
    const [membership] = await db
      .insert(membershipsSchema)
      .values({
        userId: 'user_e2e_owner',
        orgId: 'org_e2e_default',
        role: 'OWNER',
        isActive: true,
      })
      .onConflictDoNothing()
      .returning();

    console.log('✅ Membership created:', membership?.id || 'already exists');

    console.log('🎉 E2E data seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding E2E data:', error);
    throw error;
  }
}

// Run the seed function
(async () => {
  await seedE2EData();
})();
