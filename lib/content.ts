import connectDB from "@/lib/mongodb";
import SiteContent from "@/models/SiteContent";
import { defaultContent, SiteContent as SiteContentType } from "./defaultContent";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

/**
 * Merge saved content over the defaults. Arrays are replaced wholesale so
 * admin ordering / removals are respected, while new default keys are added
 * automatically when the schema grows.
 */
export function mergeContent<T>(defaults: T, saved: unknown): T {
  if (Array.isArray(defaults)) {
    return (Array.isArray(saved) ? saved : defaults) as T;
  }
  if (isPlainObject(defaults)) {
    const source = isPlainObject(saved) ? saved : {};
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(defaults)) {
      result[key] = mergeContent(
        (defaults as Record<string, unknown>)[key],
        source[key]
      );
    }
    // keep any extra keys the editor may have added
    for (const key of Object.keys(source)) {
      if (!(key in result)) result[key] = source[key];
    }
    return result as T;
  }
  return (saved === undefined || saved === null ? defaults : saved) as T;
}

export async function getSiteContent(): Promise<SiteContentType> {
  try {
    await connectDB();
    const doc = await SiteContent.findOne({ key: "site" }).lean();
    if (!doc?.data) return defaultContent;
    return mergeContent(defaultContent, doc.data);
  } catch (error) {
    console.error("Unable to load site content, using defaults:", error);
    return defaultContent;
  }
}
