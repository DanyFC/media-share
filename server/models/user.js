import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 8
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  },
  date: {
    type: Date,
    default: Date.now()
  }
}, {
  toJSON: {
    transform: function (doc, ret, options) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    }
  }
})

// userSchema.methods.toJSON = function () {
//   const user = this;
//   const userObject = user.toObject();

//   delete userObject._id
//   delete userObject.__v
//   return userObject
// }

export default mongoose.model('User', userSchema)
