require('dotenv').config({ path: '.env.development.local' });
const { sql } = require('@vercel/postgres');

const updateTodo = async (id, todoName, status) => {
  try {
    const result = await sql`
      UPDATE todos_ppqita
      SET todo = ${todoName}, status = ${status}
      WHERE id = ${id}
      RETURNING *;
    `;
    return result;
  } catch (error) {
    console.error('Error updating todo:', error.message);
    return null;
  }
};

// Example usage
updateTodo(1, 'Completed project', 1).then(console.log);