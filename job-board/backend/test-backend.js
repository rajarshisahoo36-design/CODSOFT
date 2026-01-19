// Run this with: node test-backend.js
// Make sure your server is running on localhost:5000 first!

const LOGIN_URL = 'http://localhost:5000/api/v1/auth/login';
const JOBS_URL = 'http://localhost:5000/api/v1/jobs';

// 1. CHANGE THESE TO MATCH A REAL USER IN YOUR DATABASE
const userCredentials = {
    email: "testuser@example.com", 
    password: "password123"
};

async function testBackend() {
    try {
        console.log("--- 1. Logging in... ---");
        const loginRes = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userCredentials)
        });
        const loginData = await loginRes.json();
        
        if (!loginData.success) {
            throw new Error(`Login Failed: ${loginData.error}`);
        }
        
        const token = loginData.token; // Check if your backend returns 'token' or 'data.token'
        console.log("✅ Login Successful! Token received.");

        console.log("\n--- 2. Posting a Job... ---");
        const jobRes = await fetch(JOBS_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: "Test Job via Script",
                company: "Script Co.",
                location: "Remote",
                salary: "$100k",
                description: "This job was created by a test script."
            })
        });
        const jobData = await jobRes.json();
        console.log("Response:", jobData);

        console.log("\n--- 3. Fetching All Jobs... ---");
        const getRes = await fetch(JOBS_URL);
        const getData = await getRes.json();
        console.log(`✅ Success! Found ${getData.count} jobs.`);
        console.log(getData.data);

    } catch (err) {
        console.error("❌ ERROR:", err.message);
    }
}

testBackend();