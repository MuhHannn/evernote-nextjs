import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  // cek method
  if (req.method !== "GET") {
    return res.status(405).json({ error: "method not allowed" });
  }

  // cek data
  let { status } = await req.query;

  if (status === null) {
    return res.status(400).json({ error: "status harus ada" });
  }

  // get data
  const resData =
    await sql`select todo, id from todos_ppqita where status=${status}`;

  // beritahu klo success
  return res.status(200).json({ message: "success", data: resData.rows });
}
