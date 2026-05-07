const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { trim } = require("validator");

const adminSchema = new mongoose.Schema(
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
      enum: ["admin"],
      default: "admin",
    },
    

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving
adminSchema.pre('save', async function() {  //  no next parameter
    if (!this.isModified('password')) return;
    
    try {
        this.password = await bcrypt.hash(this.password, 12);
    } catch (error) {
        throw error;  // ← throw instead of next(error)
    }
});

// Compare password
adminSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password)
}

// Remove sensitive fields
adminSchema.methods.getPublicProfile = function() {
  const admin = this.toObject();
  delete admin.password;
  return admin;
};

// Find by email
adminSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};


module.exports = mongoose.model('Admin', adminSchema);