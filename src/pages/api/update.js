import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  // cek method
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "method not allowed" });
  }

  // cek data
  let { status, id, todo } = await req.body;

  if (!id) {
    return res.status(400).json({ error: "id harus ada" });
  }

  if (status === null) {
    // jika menggunakan !status maka ketika status bernilai 0 maka dianggap true
    return res.status(400).json({ error: "status harus ada" });
  }
  // ubah data
  const resData =
    await sql`update todos_ppqita set status=${status}, todo=${todo}  where id=${id} `;

  // beritahu klo success
  return res.status(200).json({ message: "updated", data: resData });
}
