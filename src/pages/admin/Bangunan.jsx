import React, { useState, useEffect } from "react";
import Table from "../../components/table/Table";
import TableHeader from "../../components/table/TableHeader";

function Bangunan() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null); // Room yang dipilih untuk update
  const [formValues, setFormValues] = useState({}); // Nilai formulir
  const [conditionOptions, setConditionOptions] = useState([]); // Opsi kondisi default array kosong

  // Fetch data from API with pagination
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/rooms?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setRooms(data.data); // Assign the data from the response to rooms
        setTotalPages(data.meta.last_page); // Set the total pages from the response
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [currentPage]); // Trigger fetch when the page changes

  // Fetch condition options from API
  // Fetch condition options from API
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/conditions`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Response Conditions:", data);
        // Mengakses array kondisi dari properti data.data
        setConditionOptions(data.data?.data || []);
      })
      .catch((error) => console.error("Error fetching condition options:", error));
  }, []);

  const getNestedValue = (obj, key) => {
    return key.split(".").reduce((acc, part) => (acc ? acc[part] : ""), obj);
  };

  const handleEditClick = (room) => {
    setSelectedRoom(room);
    setFormValues({
      lantai: room.kondisi?.lantai || "",
      kusen: room.kondisi?.kusen || "",
      pintu: room.kondisi?.pintu || "",
      jendela: room.kondisi?.jendela || "",
      fn_flatfond: room.kondisi?.fn_flatfond || "",
      fn_dinding: room.kondisi?.fn_dinding || "",
      instalasi_air: room.kondisi?.instalasi_air || "",
      instalasi_listrik: room.kondisi?.instalasi_listrik || "",
    });
  };

  const handleUpdate = async () => {
    try {
      const selectedRoomConditions = selectedRoom.kondisi || {};
      const updatedValues = {};
      let hasChanges = false;

      Object.keys(formValues).forEach((key) => {
        if (formValues[key]?.trim() !== selectedRoomConditions[key]?.trim()) {
          updatedValues[key] = formValues[key]?.trim();
          hasChanges = true;
        }
      });

      console.log("Updated Values to Send:", updatedValues);

      if (!hasChanges) {
        alert("No changes detected.");
        return;
      }

      const payload = {
        ...updatedValues,
        _method: "PUT",
      };

      console.log("Payload JSON: ", JSON.stringify(payload));

      const response = await fetch(`http://127.0.0.1:8000/api/rooms/${selectedRoom.custom_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));
      console.log("Parsed Response Backend JSON: ", result);
    } catch (error) {
      console.error("Update Error:", error.message);
    }
  };

  const handleSelectChange = (key, value) => {
    console.log(`Updating ${key} to ${value}`);
    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const columns = [
    { key: "index", label: "No" }, // New column for row number
    { key: "unit_number", label: "Unit No" },
    { key: "rusun", label: "Nama Rusun" },
    { key: "status", label: "Status" },
    { key: "blok", label: "Blok" },
    { key: "lantai", label: "Lantai" },
    {
      key: "kondisi.lantai",
      label: "Kondisi Lantai",
      render: (value, row) => getNestedValue(row, "kondisi.lantai"),
    },
    {
      key: "kondisi.kusen",
      label: "Kondisi Kusen",
      render: (value, row) => getNestedValue(row, "kondisi.kusen"),
    },
    {
      key: "kondisi.pintu",
      label: "Kondisi Pintu",
      render: (value, row) => getNestedValue(row, "kondisi.pintu"),
    },
    {
      key: "kondisi.jendela",
      label: "Kondisi Jendela",
      render: (value, row) => getNestedValue(row, "kondisi.jendela"),
    },
    {
      key: "kondisi.fn_flatfond",
      label: "Kondisi Flatfond",
      render: (value, row) => getNestedValue(row, "kondisi.fn_flatfond"),
    },
    {
      key: "kondisi.fn_dinding",
      label: "Kondisi Dinding",
      render: (value, row) => getNestedValue(row, "kondisi.fn_dinding"),
    },
    {
      key: "kondisi.instalasi_air",
      label: "Kondisi Instalasi Air",
      render: (value, row) => getNestedValue(row, "kondisi.instalasi_air"),
    },
    {
      key: "kondisi.instalasi_listrik",
      label: "Kondisi Instalasi Listrik",
      render: (value, row) => getNestedValue(row, "kondisi.instalasi_listrik"),
    },
    {
      key: "actions",
      label: "Actions",
      render: (value, row) => (
        <button onClick={() => handleEditClick(row)} className="btn btn-sm btn-edit">
          Edit
        </button>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <TableHeader title="Kondisi Bangunan dan Unit" actions={[{ label: "Tambah Data" }]} />

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
        <Table
          columns={columns}
          data={rooms.map((room, index) => ({
            ...room,
            index: (currentPage - 1) * 10 + (index + 1), // Tambahkan offset index berdasarkan halaman
          }))}
          emptyMessage="No rooms data available"
        />
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-end space-x-2">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
          Prev
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
          Next
        </button>
        <span className="px-4 py-2 text-black">{`Page ${currentPage} of ${totalPages}`}</span>
      </div>

      {/* Update Popup */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-black">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            {/* Menampilkan custom_id */}
            <p>
              <strong>Custom ID:</strong> {selectedRoom.custom_id}
            </p>

            <h3 className="text-lg font-bold mb-4">Update Kondisi for {selectedRoom.unit_number}</h3>

            {Object.keys(formValues).map((key) => (
              <div key={key} className="form-group mb-3">
                <label>{key.replace("_", " ")}</label>
                <select value={formValues[key]} onChange={(e) => handleSelectChange(key, e.target.value)} className="w-full">
                  <option value="">Select...</option>
                  {conditionOptions.map((option) => (
                    <option key={option.custom_id} value={option.condition?.trim()}>
                      {option.condition}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={() => setSelectedRoom(null)} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bangunan;
