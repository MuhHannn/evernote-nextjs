import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [dataDetail, setDetail] = useState({}); // initialize with an empty object

  const { idDetail } = router.query;

  useEffect(() => {
    if (!idDetail) return;

    fetch(`/api/get-detail?id=${idDetail}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.data) {
          setDetail(null);
        } else {
          setDetail(data.data);
        }
      });
  }, []); // specify an empty dependency array

  return (
    <div>
      {dataDetail === null && <p>Data Kosong</p>}
      {dataDetail && (
        <div>
          Ini Halaman Detail:
          <p>ID: {dataDetail.id}</p>
          <p>Title: {dataDetail.title}</p>
          <p>Contain: {dataDetail.contain}</p>
          <p>Created: {dataDetail.created_at} </p>
          <p>Updated: {dataDetail.upload_at} </p>
        </div>
      )}
      {dataDetail === undefined && <p>Loading...</p>}
    </div>
  );
}
