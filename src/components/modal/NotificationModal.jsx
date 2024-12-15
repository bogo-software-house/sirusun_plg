
export default function NotificationModal({ message, onClose, type, onCloseCallback }) {
  const handleClose = () => {
    onClose();
    if (onCloseCallback) onCloseCallback();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className={`bg-${type === "success" ? "green" : "red"}-500 p-8 rounded-lg shadow-lg relative text-white max-w-lg w-full`}>
        <button className="absolute top-2 right-2 text-white text-xl font-bold" onClick={handleClose}>

          &times;
        </button>
        <p className="text-lg font-semibold ">{type}!</p>
        <p className="text-lg font-semibold mt-4">{message}</p>

        <div className="mt-6 flex justify-end gap-2">
          <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200" onClick={handleClose}>

            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
