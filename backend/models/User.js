const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { trim } = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be atleast 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be atleast 8 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: String,
    otpExpiry: Date,

    status: {
      type: String,
      enum: ["active", "banned"],
      default: "active",
    },
    banReason: {
      type: String,
      default: null,
    },
    bannedAt: {
      type: Date,
      default: null,
    },
    bannedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Runs before saving user to database

userSchema.pre('save', async function() {  
    if (!this.isModified('password')) return;
    
    try {
        this.password = await bcrypt.hash(this.password, 12);
    } catch (error) {
        throw error;  
    }
});

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password)
}

userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.statics.findActiveUsers = function() {
  return this.find({ status: 'active' });
};

userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};


module.exports = mongoose.model('User', userSchema);