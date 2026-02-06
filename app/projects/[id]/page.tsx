import { notFound } from 'next/navigation';
import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;
const DATABASE_NAME = process.env.DATABASE_NAME!;

async function getProject(id: string) {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();

  const db = client.db(DATABASE_NAME);
  const project = await db.collection('projects').findOne({ _id: new ObjectId(id) });

  return project;
}

export default async function ProjectDetails({ params }: any) {
  const project = await getProject(params.id);

  if (!project) return notFound();

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6">{project.title}</h1>

      <p className="text-gray-700 mb-4">{project.description}</p>

      <div className="mb-4 text-blue-700 font-medium">Location: {project.location}</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.images?.map((img: string, index: number) => (
          <img key={index} className="rounded-xl shadow" src={img} alt="" />
        ))}
      </div>
    </div>
  );
}
