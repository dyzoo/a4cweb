import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: '' },
    slug: { type: String, required: true, unique: true, trim: true },
    category: { type: String, default: 'Community' },
    status: { type: String, default: 'Active' },
    description: { type: String, default: '' },
    longDescription: { type: String, default: '' },
    overview: { type: String, default: '' },
    background: { type: String, default: '' },
    image: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    location: { type: String, default: 'Tanzania' },
    duration: { type: String, default: '' },
    beneficiaries: { type: Number, default: 0 },
    ageRange: { type: String, default: '' },
    fundingProgress: { type: Number, default: 0 },
    objectives: { type: [String], default: [] },
    curriculum: { type: [String], default: [] },
    impact: { type: [String], default: [] },
    supportServices: {
      meals: { type: String, default: '' },
      transportation: { type: String, default: '' },
      mentorship: { type: String, default: '' },
    },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    technologies: { type: [String], default: [] },
    githubUrl: String,
    liveUrl: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { minimize: false }
);

ProjectSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Project ||
  mongoose.model('Project', ProjectSchema, 'projects');
