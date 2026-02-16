import { notFound } from "next/navigation";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Project from "@/models/project";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectDetails({ params }: PageProps) {
  const { slug } = await params;   // 👈 IMPORTANT (new Next.js behavior)

  await connectDB();

  const project = await Project.findOne({
    slug: slug,
  }).lean();

  if (!project) return notFound();

  const cleanProject = JSON.parse(JSON.stringify(project)); // serialize

  return (
    <div className="bg-white">
      {/* 🔵 HERO */}
      <section className="relative h-[450px] w-full">
        <img
          src={cleanProject.imageUrl}
          alt={cleanProject.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="max-w-6xl mx-auto px-6 text-white">
            <h1 className="text-4xl md:text-5xl font-bold">
              {cleanProject.title}
            </h1>
          </div>
        </div>
      </section>

      {/* 🔵 CONTENT */}
      <section className="max-w-5xl mx-auto py-16 px-6">

        <h2 className="text-2xl font-semibold mb-6">
          About This Project
        </h2>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-10">
          {cleanProject.longDescription}
        </p>

        {cleanProject.technologies?.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4">
              Technologies Used
            </h3>

            <div className="flex flex-wrap gap-3">
              {cleanProject.technologies.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="bg-gray-100 px-4 py-2 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-6">
          {cleanProject.liveUrl && (
            <a href={cleanProject.liveUrl} target="_blank">
              Visit Project
            </a>
          )}

          {cleanProject.githubUrl && (
            <a href={cleanProject.githubUrl} target="_blank">
              View Source
            </a>
          )}
        </div>

        <div className="mt-12">
          <Link href="/projects">
            ← Back to All Projects
          </Link>
        </div>
      </section>
    </div>
  );
}
