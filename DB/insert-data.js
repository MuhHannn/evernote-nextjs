require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(title, contain) {
  const result = await sql`
        INSERT INTO evernote (title,contain)
        VALUES (${title}, ${contain})
        `;
  console.log(result);
}

execute("Catatan Keuangan", "Keuangan Bulan Mei");
