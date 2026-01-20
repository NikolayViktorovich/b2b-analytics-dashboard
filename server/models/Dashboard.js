import mongoose from 'mongoose'

const dashboardSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    index: true
  },
  period: {
    type: String,
    enum: ['today', 'week', 'month', 'year'],
    default: 'today'
  },
  stats: {
    revenue: {
      value: Number,
      change: Number,
      trend: String
    },
    orders: {
      value: Number,
      change: Number,
      trend: String
    },
    customers: {
      value: Number,
      change: Number,
      trend: String
    },
    conversion: {
      value: Number,
      change: Number,
      trend: String
    }
  },
  revenueChart: [{
    date: String,
    revenue: Number,
    orders: Number
  }],
  topProducts: [{
    name: String,
    sales: Number,
    revenue: Number,
    growth: Number
  }],
  trafficSources: [{
    source: String,
    value: Number,
    change: Number
  }]
}, {
  timestamps: true
})

dashboardSchema.index({ date: -1, period: 1 })

export default mongoose.model('Dashboard', dashboardSchema)
