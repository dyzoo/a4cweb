import mongoose from 'mongoose';

const VolunteerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  countryCode: String,
  email: String,
  birthDate: Date,
  location: String,
  cvUrl: String,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Volunteer ||
  mongoose.model('Volunteer', VolunteerSchema);
