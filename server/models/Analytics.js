import mongoose from 'mongoose'

const analyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    index: true
  },
  period: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    default: 'daily'
  },
  revenue: {
    total: { type: Number, default: 0 },
    orders: { type: Number, default: 0 },
    avgOrderValue: { type: Number, default: 0 }
  },
  products: [{
    name: String,
    sales: Number,
    revenue: Number,
    growth: Number
  }],
  categories: [{
    name: String,
    sales: Number,
    revenue: Number
  }],
  geography: [{
    country: String,
    sales: Number,
    revenue: Number
  }],
  sources: [{
    name: String,
    value: Number,
    percentage: Number
  }],
  funnel: [{
    stage: String,
    value: Number,
    percentage: Number
  }],
  rfmSegments: [{
    segment: String,
    customers: Number,
    revenue: Number
  }],
  comparison: {
    current: Number,
    previous: Number,
    change: Number
  }
}, {
  timestamps: true
})

analyticsSchema.index({ date: 1, period: 1 })

export default mongoose.model('Analytics', analyticsSchema)
