import mongoose from 'mongoose'

const backupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  size: Number,
  data: {
    users: Array,
    analytics: Array,
    nps: Array,
    website: Array,
    dashboard: Object
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Backup', backupSchema)
