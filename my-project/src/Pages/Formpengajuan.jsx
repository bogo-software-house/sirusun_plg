import React, { useEffect, useState } from "react";
import axios from "axios";

function Formpengajuan() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newRusun, setNewRusun] = useState({
    custom_id: "",
    Name_Rusun: "",
  });
  const [isEditing, setIsEditing] = useState(false); // State untuk menentukan apakah sedang dalam mode edit
  const [editId, setEditId] = useState(null); // State untuk menyimpan ID item yang sedang diedit

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/rusuns");
      setData(response.data.data.data);
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRusun({ ...newRusun, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Jika dalam mode edit, lakukan update
        const response = await axios.put(
          `http://localhost:8000/api/rusuns/${editId}`,
          newRusun
        );
        console.log("Data updated:", response.data);
      } else {
        // Jika tidak dalam mode edit, lakukan penambahan
        const response = await axios.post(
          "http://localhost:8000/api/rusuns",
          newRusun
        );
        console.log("Data added:", response.data);
      }
      fetchData(); // Refresh data setelah menambah atau mengupdate
      setNewRusun({ custom_id: "", Name_Rusun: "" }); // Reset form
      setIsEditing(false); // Reset mode edit
      setEditId(null); // Reset ID edit
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Error saving data");
    }
  };

  const handleEdit = (item) => {
    setNewRusun({ custom_id: item.custom_id, Name_Rusun: item.Name_Rusun });
    setIsEditing(true);
    setEditId(item.custom_id); // Simpan ID item yang sedang diedit
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 font-black">
        Data from Laravel API
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          className="font-black"
          type="text"
          name="custom_id"
          value={newRusun.custom_id}
          onChange={handleChange}
          placeholder="Custom ID"
          required
        />
        <input
          className="font-black"
          type="text"
          name="Name_Rusun"
          value={newRusun.Name_Rusun}
          onChange={handleChange}
          placeholder="Name Rusun"
          required
        />
        <button type="submit">{isEditing ? "Update Data" : "Add Data"}</button>
      </form>
      <div style={{ border: "1px solid black", marginTop: "20px" }}>
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.custom_id}>
              <h1 className="font-black" style={{ color: "black" }}>
                {item.custom_id} - {item.Name_Rusun}
              </h1>
              <button onClick={() => handleEdit(item)}>Edit</button>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}

export default Formpengajuan;
