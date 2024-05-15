import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [showAllData, setShowAllData] = useState();

  useEffect(() => {
    fetch(`/api/get-all`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          console.log(data.data.length ? true : false);
          setShowAllData(data.data);
          return;
        }
        setShowAllData(null);
      })
      .catch((err) => {
        alert("Hubungi saya nek error");
        console.log("Gada Data jadinya error", err.message);
      });
  }, []);

  const handleDelete = async (id) => {
    alert("delete");
    const dataBody = JSON.stringify({ id });
    await fetch(`/api/delete-data`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", //wajib ada
      },
      body: dataBody,
    });
    await fetch("/api/get-all")
      .then((res) => res.json())
      .then((data) => {
        setShowAllData(data.data);
      });
  };

  return (
    <div>
      <h1>Halaman Utama</h1>
      <button
        onClick={() => {
          router.push("/add-data");
        }}
      >
        Add Data
      </button>
      {showAllData === undefined && <p>Loading...</p>}
      {showAllData === null && <p>Data Kosong</p>}
      {showAllData && (
        <div>
          {showAllData.map((data, index) => {
            return (
              <div key={index} className="flex">
                <p> {data.id}</p>
                <p> {data.title}</p>
                <p> {data.contain}</p>
                <p> {data.created_at}</p>
                <p>{data.upload_at}</p>
                <button
                  onClick={() => {
                    router.push(`/edit/${data.id}`);
                  }}
                >
                  edit
                </button>
                <button
                  onClick={() => {
                    handleDelete(data.id);
                  }}
                >
                  hapus
                </button>
                <button
                  onClick={() => {
                    router.push(`/detail/${data.id}`);
                  }}
                >
                  detail
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
