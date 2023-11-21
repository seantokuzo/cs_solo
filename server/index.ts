import { app } from './app'
import mongoose from 'mongoose'

const port = process.env.PORT || 5000

const start = async () => {
  if (!process.env.MONGO_URI) throw new Error('💥 MONGO_URI must be defined')

  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('🍃 Connected to database')
    app.listen(port, () => {
      console.log(`💥 Listening on port ${port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

start()
