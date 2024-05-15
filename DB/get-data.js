require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute() {
    const { rows } = await sql`
        SELECT * FROM evernote `;
    console.log(rows);
}

execute();
