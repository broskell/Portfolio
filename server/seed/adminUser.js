import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import { connectDB } from '../src/config/db.js'
import User from '../src/modules/auth/user.model.js'

const adminEmail = process.env.ADMIN_EMAIL || 'admin@test.com'
const adminPassword = process.env.ADMIN_PASSWORD || 'StrongAdminPassword@1'
const bcryptRounds = Number(process.env.BCRYPT_ROUNDS || 12)

async function seedAdmin() {
  await connectDB()

  const passwordHash = await bcrypt.hash(adminPassword, bcryptRounds)
  const existingAdmin = await User.findOne({ email: adminEmail }).select('+passwordHash')

  if (existingAdmin) {
    existingAdmin.name = existingAdmin.name || 'Admin User'
    existingAdmin.passwordHash = passwordHash
    existingAdmin.role = 'admin'
    existingAdmin.status = 'published'
    existingAdmin.isDeleted = false
    existingAdmin.deletedAt = undefined
    existingAdmin.refreshTokenVersion += 1
    existingAdmin.refreshTokenHash = undefined
    existingAdmin.refreshTokenExpiresAt = undefined
    await existingAdmin.save()
    console.log(`Updated admin user: ${adminEmail}`)
  } else {
    await User.create({
      name: 'Admin User',
      email: adminEmail,
      passwordHash,
      role: 'admin',
      status: 'published'
    })
    console.log(`Created admin user: ${adminEmail}`)
  }

  await mongoose.disconnect()
}

seedAdmin().catch(async (error) => {
  console.error(error)
  await mongoose.disconnect().catch(() => {})
  process.exit(1)
})
