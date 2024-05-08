import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,},
  username: {
    type: String,},
  level: { 
    type: Number, default: 0 
  },
  hasStarted: { 
    type: Boolean, default: true 
  }
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
