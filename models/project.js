import mongoose from 'mongoose';
const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  technologies: [{
    type: String,
  }],
  githubUrl: String,
  liveUrl: String,
  featured: {
    type: Boolean,
    default: false,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});  // Create slug from title before saving 
ProjectSchema.pre('save',
  function (next) {
    if (!this.slug) {
      this.slug = this.title.toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g,
          '');
    } next();
  }); export default mongoose.models.Project ||
    mongoose.model('Project', ProjectSchema, "projects");