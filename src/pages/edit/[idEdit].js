import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [dataDetail, setDetail] = useState();
  const [isChecked, setIsChecked] = useState(false);

  const { idEdit } = router.query;

  useEffect(() => {
    if (!idEdit) return;

    fetch(`/api/detail?id=${idEdit}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDetail(data.data ? data.data : null);
        console.log(data.data);
        if (data.data) {
          setIsChecked(data.data.status === 1);
        }
      });
  }, [idEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const todo = event.target.todo.value;
    const status = event.target.status.checked ? 1 : 0;

    fetch(`/api/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", //wajib ada
      },
      body: JSON.stringify({
        status: status,
        todo: todo,
        id: idEdit,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((data) => {
        alert("error: ", data.message);
      });
  };

  return (
    <div>
      {!dataDetail === undefined && <p>Loading...</p>}
      {dataDetail === null && <p>Data Kosong</p>}
      {dataDetail && (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="todo">Todo :</label>
              <input name="todo" defaultValue={dataDetail.todo}></input>
            </div>
            <div>
              <label htmlFor="todo">Status :</label>
              <input
                type="checkbox"
                name="status"
                value="1"
                onChange={(event) => {
                  setIsChecked(event.target.checked);
                }}
                checked={isChecked}
              ></input>
            </div>
            <div>
              <button type="submit">Update Data</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
