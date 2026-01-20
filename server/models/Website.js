import mongoose from 'mongoose'

const websiteSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    index: true
  },
  traffic: {
    visitors: { type: Number, default: 0 },
    pageViews: { type: Number, default: 0 },
    sessions: { type: Number, default: 0 },
    bounceRate: { type: Number, default: 0 },
    avgSessionDuration: { type: Number, default: 0 }
  },
  sources: [{
    name: String,
    visitors: Number,
    percentage: Number
  }],
  devices: [{
    type: { type: String },
    visitors: Number,
    percentage: Number
  }],
  popularPages: [{
    path: String,
    views: Number,
    avgTime: Number,
    bounceRate: Number
  }],
  behavior: {
    avgPagesPerSession: { type: Number, default: 0 },
    avgTimeOnPage: { type: Number, default: 0 },
    exitRate: { type: Number, default: 0 }
  }
}, {
  timestamps: true
})

websiteSchema.index({ date: -1 })

export default mongoose.model('Website', websiteSchema)
