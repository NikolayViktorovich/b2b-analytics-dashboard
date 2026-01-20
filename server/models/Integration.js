import mongoose from 'mongoose'

const integrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['connected', 'disconnected'],
    default: 'disconnected'
  },
  config: {
    type: Map,
    of: String,
    default: {}
  },
  lastSync: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

integrationSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.model('Integration', integrationSchema)
