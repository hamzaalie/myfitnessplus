const { spawn } = require('child_process');
const path = require('path');

const runScript = (scriptName, userEmail) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, scriptName);
    const args = [scriptPath];
    if (userEmail) args.push(userEmail);
    
    const child = spawn('node', args, {
      stdio: 'inherit',
      cwd: __dirname
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`${scriptName} exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
};

const seedAll = async () => {
  const userEmail = process.argv[2] || 'testuser@example.com';
  
  console.log('🌱 Starting complete seed process...\n');
  console.log(`📧 User email: ${userEmail}\n`);
  
  try {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('1️⃣  SEEDING WORKOUTS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    await runScript('seedWorkouts.js', userEmail);
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('2️⃣  SEEDING GOALS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    await runScript('seedGoals.js', userEmail);
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('3️⃣  SEEDING MEALS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    await runScript('seedMeals.js', userEmail);
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✨ ALL SEEDS COMPLETED SUCCESSFULLY! ✨');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🚀 Refresh your browser to see the data!');
    
  } catch (error) {
    console.error('\n❌ Seed process failed:', error.message);
    process.exit(1);
  }
};

seedAll();
