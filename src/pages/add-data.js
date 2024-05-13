import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleAdd = (event) => {
    event.preventDefault();
    const todo = event.target.todo.value;

    console.log(todo);

    fetch("/api/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: todo,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        router.push("/");
      })
      .catch((err) => {
        alert("hubungi saya", err.message);
      });
  };

  return (
    <div>
      <p>Ini Halaman Add Data</p>
      <div>
        <form onSubmit={handleAdd}>
          <label>Todo: </label>
          <input name="todo"></input>
          <div>
            <button type="submit">Add Data</button>
          </div>
        </form>
      </div>
    </div>
  );
}
