"use client";
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMsg(data.message + " | ID: " + data.id);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Upload File</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button
        onClick={uploadFile}
        className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
      >
        Upload
      </button>

      {msg && <p className="mt-4 text-blue-600">{msg}</p>}
    </div>
  );
}
