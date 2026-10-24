import { ObjectId } from "mongodb";
import connectDB from "@/lib/mongodb";
import Media from "@/models/Media";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return new Response("Not found", { status: 404 });
    }

    await connectDB();
    const media = await Media.findById(id);
    if (!media) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(new Uint8Array(media.data), {
      headers: {
        "Content-Type": media.mimeType,
        "Content-Length": String(media.size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Unable to load media:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
