import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import { connectDB } from '../src/config/db.js'
import User from '../src/modules/auth/user.model.js'

async function migrate() {
  await connectDB()
  const users = await User.find({}).select('+passwordHash')
  console.log(`Found ${users.length} users to check.`)

  for (const user of users) {
    const isBcrypt = user.passwordHash && user.passwordHash.startsWith('$2')
    if (!isBcrypt && user.passwordHash) {
      console.log(`Hashing plain text password for user: ${user.email}`)
      const hashedPassword = await bcrypt.hash(user.passwordHash, 12)
      user.passwordHash = hashedPassword
      await user.save()
      console.log(`Successfully migrated user: ${user.email}`)
    } else {
      console.log(`User ${user.email} already has a hashed password.`)
    }
  }

  await mongoose.disconnect()
}

migrate().catch(async (error) => {
  console.error(error)
  await mongoose.disconnect().catch(() => {})
  process.exit(1)
})
