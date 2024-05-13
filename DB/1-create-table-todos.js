require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

const execute = async () => {
  console.log(execute);

  const deleteTable = await sql`DROP TABLE IF EXISTS todos_ppqita`;

  console.log(deleteTable);

  const createTable = await sql`
    CREATE TABLE todos_ppqita (
      id SERIAL PRIMARY KEY,
      todo VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      status BOOLEAN NOT NULL DEFAULT false
    )
  `;
  console.log(createTable);
};

execute();
