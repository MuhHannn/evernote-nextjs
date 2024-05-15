import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleAdd = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const contain = event.target.contain.value;

    console.log(title, contain);

    fetch("/api/insert-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        contain: contain,
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
          <label>title: </label>
          <input name="title"></input>
          <label>contain: </label>
          <input name="contain"></input>
          <div>
            <button type="submit">Add Data</button>
          </div>
        </form>
      </div>
    </div>
  );
}
