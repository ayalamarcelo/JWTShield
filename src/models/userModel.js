const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const util = require('util');
const jwt = require('jsonwebtoken');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const query = util.promisify(pool.query).bind(pool);

const userSchema = {
  tableName: 'users',
  columns: {
    id: 'INT AUTO_INCREMENT PRIMARY KEY',
    username: 'VARCHAR(255) UNIQUE',
    password: 'VARCHAR(255)'
  }
};

// Method to create the users table in MySQL
async function createUserTable() {
  try {
    await query(`CREATE TABLE IF NOT EXISTS ${userSchema.tableName} (${Object.entries(userSchema.columns).map(([name, type]) => `${name} ${type}`).join(', ')});`);
    console.log('User table created or already exists.');
  } catch (error) {
    console.error('Error creating user table:', error);
  }
}

// Hash password
async function hashPassword(password) {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

// Method to compare passwords
async function comparePassword(password, hashedPassword) {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
}

// Method to create a new user
async function createUser(username, password) {
  try {
    const hashedPassword = await hashPassword(password);
    await query(`INSERT INTO ${userSchema.tableName} (username, password) VALUES (?, ?)`, [username, hashedPassword]);
    console.log('User created successfully.');
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

// Method to find a user by username
async function findUserByUsername(username) {
  try {
    const [rows] = await query(`SELECT * FROM ${userSchema.tableName} WHERE username = ?`, [username]);
    return rows[0];
  } catch (error) {
    throw new Error('Error finding user by username');
  }
}

// Export functions and schema
module.exports = {
  createUserTable,
  createUser,
  findUserByUsername,
  comparePassword
};
