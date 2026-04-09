const mongoose = require('mongoose');
require('../config/database');
const User = require('../models/User');

async function findUsers() {
  try {
    const users = await User.find({}).select('name email');
    console.log('\n📧 Users in database:');
    users.forEach(user => {
      console.log(`   ${user.name} - ${user.email}`);
    });
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

setTimeout(findUsers, 1000);
