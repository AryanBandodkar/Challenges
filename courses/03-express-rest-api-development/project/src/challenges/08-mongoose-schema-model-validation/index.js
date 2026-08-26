import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 100,
  },
});

export const User = mongoose.model('User', userSchema);

export function solve_08_mongoose_schema_model_validation() {
  return {
    User,
    userSchema,
  };
}