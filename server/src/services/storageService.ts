import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { env } from "../config/env.js";

const BUCKET = "uploads";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

export type UploadFolder = "banners" | "products" | "categories";

export async function ensureBucketExists(): Promise<void> {
  const { data: buckets } = await supabase.storage.listBuckets();
  if (buckets?.some((b) => b.name === BUCKET)) return;
  await supabase.storage.createBucket(BUCKET, { public: true });
}

export async function uploadImage(
  folder: UploadFolder,
  buffer: Buffer,
  originalName: string,
  contentType: string
): Promise<string> {
  const ext = originalName.includes(".") ? originalName.split(".").pop() : "jpg";
  const path = `${folder}/${randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, buffer, {
    contentType,
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
