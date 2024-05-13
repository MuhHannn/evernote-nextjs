require("dotenv").config({ path: ".env.development.local" });
const { sql } = require("@vercel/postgres");

const readAllTodos = async () => {
  const todos = await sql`SELECT * FROM todos_ppqita`;
  return todos.rows;
};

readAllTodos().then(console.log);
