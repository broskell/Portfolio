import mongoose from 'mongoose'

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI
  if (!uri) {
    throw new Error('MONGODB_URI or MONGO_URI is not defined')
  }

  await mongoose.connect(uri)
  console.log('MongoDB connected')
}
