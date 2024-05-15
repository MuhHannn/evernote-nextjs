import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  let { title, contain } = await req.body;

  if (!title) {
    return res.status(400).json({ error: "title harus ada" });
  }

  const resData =
    await sql`INSERT INTO evernote (title, contain, created_at, upload_at)
  VALUES (${title}, ${contain}, ${new Date()}, ${new Date()})`;

  return res.status(200).json({ message: "saved", data: resData });
}
