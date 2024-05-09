import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [showAllData, setShowAllData] = useState();

  useEffect(() => {
    fetch(`/api/read-all-todo?status=0`)
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

  const handleTodo = (event) => {
    event.preventDefault();
    alert("cek 0");
    fetch(`/api/read-all-todo?status=0`)
      .then((res) => res.json())
      .then((data) => {
        setShowAllData(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        alert("Hubungi saya nek error");
        console.log("Gada Data jadinya error", err.message);
      });
  };

  const handleDone = (event) => {
    event.preventDefault();
    alert("cek 1");
    fetch(`/api/read-all-todo?status=1`)
      .then((res) => res.json())
      .then((data) => {
        setShowAllData(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        alert("Hubungi saya nek error");
        console.log("Gada Data jadinya error", err.message);
      });

    alert("cek 1");
  };

  const handleDelete = async (id) => {
    alert("delete");
    const dataBody = JSON.stringify({ id });
    await fetch(`/api/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", //wajib ada
      },
      body: dataBody,
    });
    await fetch("/api/read-all-todo?status=0")
      .then((res) => res.json())
      .then((data) => {
        setShowAllData(data.data);
      });
  };

  return (
    <>
      <button onClick={handleTodo}>Belum dikerjakan</button>
      <button onClick={handleDone}>Sudah dikerjakan</button>
      <br />
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
              <div key={index}>
                {data.id}
                {data.todo}
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
      <h1 className="bg-blue-500 text-center text-3xl font-bold text-red-300 p-4">
        Ini Halaman Utama
      </h1>
    </>
  );
}
