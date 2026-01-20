import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    select: false
  },
  name: {
    type: String,
    required: true
  },
  avatar: String,
  role: {
    type: String,
    enum: ['admin', 'manager', 'viewer'],
    default: 'viewer'
  },
  accessCode: {
    type: String,
    unique: true,
    sparse: true
  },
  notifications: {
    emailNotifications: { type: Boolean, default: true },
    pushNotifications: { type: Boolean, default: false },
    weeklyReport: { type: Boolean, default: true }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.getPermissions = function() {
  const rolePermissions = {
    admin: [
      'dashboard:view', 'dashboard:edit', 'analytics:view', 'analytics:export',
      'nps:view', 'nps:manage', 'website:view', 'settings:view', 'settings:edit',
      'users:view', 'users:manage', 'roles:manage'
    ],
    manager: [
      'dashboard:view', 'dashboard:edit', 'analytics:view', 'analytics:export',
      'nps:view', 'website:view', 'settings:view', 'users:view'
    ],
    viewer: [
      'dashboard:view', 'analytics:view', 'nps:view', 'website:view'
    ]
  }
  return rolePermissions[this.role] || []
}

export default mongoose.model('User', userSchema)
