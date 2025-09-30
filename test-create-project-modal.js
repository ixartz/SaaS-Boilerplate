// Comprehensive test for Create Project Modal
const fetch = require('node-fetch');

async function testCreateProjectModal() {
  const baseUrl = 'http://localhost:3000';

  console.log('🧪 Testing Create Project Modal Comprehensive');
  console.log('='.repeat(50));

  const testResults = {
    passed: 0,
    failed: 0,
    total: 0,
  };

  function logTest(testName, passed, details = '') {
    testResults.total++;
    if (passed) {
      testResults.passed++;
      console.log(`✅ ${testName}${details ? ` - ${details}` : ''}`);
    } else {
      testResults.failed++;
      console.log(`❌ ${testName}${details ? ` - ${details}` : ''}`);
    }
  }

  try {
    // Test 1: Server Health Check
    console.log('\n1. Server Health Check...');
    const healthResponse = await fetch(`${baseUrl}/dashboard`);
    logTest('Server Status', healthResponse.status === 200, `Status: ${healthResponse.status}`);

    // Test 2: Projects API Health
    console.log('\n2. Projects API Health...');
    const projectsResponse = await fetch(`${baseUrl}/api/test-projects-frontend`);
    logTest('Projects API', projectsResponse.ok, `Status: ${projectsResponse.status}`);

    // Test 3: Users API Health
    console.log('\n3. Users API Health...');
    const usersResponse = await fetch(`${baseUrl}/api/test-users`);
    logTest('Users API', usersResponse.ok, `Status: ${usersResponse.status}`);

    // Test 4: Cloudinary Signature API
    console.log('\n4. Cloudinary Signature API...');
    const cloudinaryResponse = await fetch(`${baseUrl}/api/v1/cloudinary/sign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folder: 'projects', public_id: 'test' }),
    });
    logTest('Cloudinary API', cloudinaryResponse.ok, `Status: ${cloudinaryResponse.status}`);

    // Test 5: Project Creation - Name Only (Required)
    console.log('\n5. Project Creation - Name Only...');
    const projectNameOnly = {
      name: 'Test Project Name Only',
    };

    const response1 = await fetch(`${baseUrl}/api/test-projects-frontend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectNameOnly),
    });

    const data1 = await response1.json();
    logTest('Name Only Project', response1.ok, `Status: ${response1.status}`);
    if (response1.ok) {
      logTest('Project Name Correct', data1.item.name === 'Test Project Name Only');
      logTest('Manager ID Null', data1.item.managerId === null || data1.item.managerId === undefined);
    }

    // Test 6: Project Creation - With Empty Manager
    console.log('\n6. Project Creation - Empty Manager...');
    const projectEmptyManager = {
      name: 'Test Project Empty Manager',
      managerId: '',
    };

    const response2 = await fetch(`${baseUrl}/api/test-projects-frontend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectEmptyManager),
    });

    const data2 = await response2.json();
    logTest('Empty Manager Project', response2.ok, `Status: ${response2.status}`);

    // Test 7: Project Creation - With All Optional Fields
    console.log('\n7. Project Creation - All Optional Fields...');
    const projectFull = {
      name: 'Test Project Full',
      description: 'Full project with all fields',
      budget: 1000000,
      startDate: '2024-01-01T00:00:00.000Z',
      endDate: '2024-12-31T23:59:59.999Z',
      status: 'planning',
      managerId: '',
      thumbnailUrl: 'https://res.cloudinary.com/dy44qfit2/image/upload/v1234567890/projects/test.jpg',
    };

    const response3 = await fetch(`${baseUrl}/api/test-projects-frontend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectFull),
    });

    const data3 = await response3.json();
    logTest('Full Project', response3.ok, `Status: ${response3.status}`);
    if (response3.ok) {
      logTest('All Fields Present', data3.item.name
      && data3.item.description
      && data3.item.budget
      && data3.item.thumbnailUrl);
      logTest('Cloudinary URL Valid', data3.item.thumbnailUrl?.includes('res.cloudinary.com'));
    }

    // Test 8: Project Creation - Invalid Name (Too Short)
    console.log('\n8. Project Creation - Invalid Name...');
    const projectInvalidName = {
      name: 'AB', // Too short
    };

    const response4 = await fetch(`${baseUrl}/api/test-projects-frontend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectInvalidName),
    });

    logTest('Invalid Name Rejected', !response4.ok, `Status: ${response4.status}`);

    // Test 9: Project Creation - Base64 Thumbnail (Should Reject)
    console.log('\n9. Project Creation - Base64 Thumbnail...');
    const projectBase64 = {
      name: 'Test Project Base64',
      thumbnailUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
    };

    const response5 = await fetch(`${baseUrl}/api/test-projects-frontend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectBase64),
    });

    logTest('Base64 Thumbnail Rejected', !response5.ok, `Status: ${response5.status}`);

    // Test 10: Projects List After Creation
    console.log('\n10. Projects List After Creation...');
    const finalProjectsResponse = await fetch(`${baseUrl}/api/test-projects-frontend`);

    if (finalProjectsResponse.ok) {
      const finalProjectsData = await finalProjectsResponse.json();
      logTest('Projects List Retrieved', true, `Total: ${finalProjectsData.items.length}`);

      // Check if our test projects are in the list
      const testProjects = finalProjectsData.items.filter(p =>
        p.name.startsWith('Test Project'),
      );
      logTest('Test Projects Found', testProjects.length >= 3, `Found: ${testProjects.length}`);
    } else {
      logTest('Projects List Retrieved', false, `Status: ${finalProjectsResponse.status}`);
    }

    // Final Results
    console.log('\n🎯 Test Results Summary:');
    console.log('='.repeat(30));
    console.log(`✅ Passed: ${testResults.passed}`);
    console.log(`❌ Failed: ${testResults.failed}`);
    console.log(`📊 Total: ${testResults.total}`);
    console.log(`📈 Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(1)}%`);

    if (testResults.failed === 0) {
      console.log('\n🎉 ALL TESTS PASSED! Create Project Modal is working perfectly!');
      return true;
    } else {
      console.log('\n⚠️ Some tests failed. Please check the issues above.');
      return false;
    }
  } catch (error) {
    console.error('💥 Test error:', error);
    return false;
  }
}

testCreateProjectModal().then((success) => {
  process.exit(success ? 0 : 1);
});
