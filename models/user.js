import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: String,
  email: {
    type: String,
    required: true,
    max: 256,
    min: 6,
    // unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  active: {
    type: Boolean,
    default: false
  },
  createdTime: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User", userSchema);
