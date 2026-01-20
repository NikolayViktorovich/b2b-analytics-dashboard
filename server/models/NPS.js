import mongoose from 'mongoose'

const npsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    index: true
  },
  score: {
    type: Number,
    required: true,
    min: -100,
    max: 100
  },
  promoters: { type: Number, default: 0 },
  passives: { type: Number, default: 0 },
  detractors: { type: Number, default: 0 },
  totalResponses: { type: Number, default: 0 },
  distribution: [{
    score: { type: Number, min: 0, max: 10 },
    count: Number
  }],
  categories: [{
    name: String,
    score: Number,
    responses: Number
  }],
  reviews: [{
    customerName: String,
    score: { type: Number, min: 0, max: 10 },
    comment: String,
    category: String,
    date: Date,
    sentiment: {
      type: String,
      enum: ['positive', 'neutral', 'negative']
    }
  }]
}, {
  timestamps: true
})

npsSchema.index({ date: -1 })

export default mongoose.model('NPS', npsSchema)
