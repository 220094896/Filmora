const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to the same database as the running server
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/filmora-test';
    
    await mongoose.connect(mongoUri);
    console.log('Connected to database');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@movierental.com' });
    if (existingAdmin) {
      console.log('Admin user already exists, updating role to admin...');
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      console.log('Admin role updated successfully');
    } else {
      // Create new admin
      const hashedPassword = await bcrypt.hash('Admin123!', 10);
      const admin = await User.create({
        name: 'System Administrator',
        email: 'admin@movierental.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user created successfully');
    }

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

createAdmin();