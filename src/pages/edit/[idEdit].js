import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [dataDetail, setDetail] = useState();

  const { idEdit } = router.query;

  useEffect(() => {
    if (!idEdit) return;

    fetch(`/api/get-detail?id=${idEdit}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDetail(data.data ? data.data : null);
        console.log(data.data);
      });
  }, [idEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const contain = event.target.contain.value;
    const updated_at = new Date();

    fetch(`/api/update-data`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", //wajib ada
      },
      body: JSON.stringify({
        title: title,
        contain: contain,
        updated_at: updated_at,
        id: idEdit,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        router.push(`/`);
      })
      .catch((data) => {
        alert("error: ", data.message);
      });
  };

  return (
    <div>
      {dataDetail === undefined && <p>Loading...</p>}
      {dataDetail === null && <p>Data Kosong</p>}
      {dataDetail && (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title :</label>
              <input name="title" defaultValue={dataDetail.title}></input>
              <input name="contain" defaultValue={dataDetail.contain}></input>
            </div>
            <div>
              <button type="submit">Update Data</button>
              <button
                onClick={() => {
                  router.push(`/`);
                }}
              >
                Kembali
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
