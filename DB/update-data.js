require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(title, contain, id) {
  const result = await sql`
        UPDATE evernote SET title = ${title}, contain = ${contain} WHERE id = ${id}`;
  console.log("Berhasil mengupdate data", result);
  return result;
}

execute("Pengularan barang dagang", "Makanan Kemasan", 2);
