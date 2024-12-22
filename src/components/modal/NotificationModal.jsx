import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function NotificationModal({
  message,
  onClose,
  type,
  onCloseCallback,
}) {
  const handleClose = () => {
    onClose();
    if (onCloseCallback) onCloseCallback();
  };

  const iconColor = type === "Success" ? "text-green-400" : "text-red-400";
  const bgColor = type === "Success" ? "bg-green-50" : "bg-red-50";
  const textColor = type === "Success" ? "text-green-800" : "text-red-800";
  const buttonColor = type === "Success" ? "text-green-800" : "text-red-800";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className={`${bgColor} p-4 rounded-md max-w-lg w-full`}>
        <div className="flex">
          <div className="flex-shrink-0">
            <CheckCircleIcon
              aria-hidden="true"
              className={`h-5 w-5 ${iconColor}`}
            />
          </div>
          <div className="ml-3">
            <h3 className={`text-sm font-medium ${textColor}`}>
              {type === "Success" ? "Success" : "Error"}
            </h3>
            <div className="mt-2 text-sm text-gray-700">
              <p>{message}</p>
            </div>
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                <button
                  type="button"
                  className={`rounded-md ${bgColor} px-2 py-1.5 text-sm font-medium ${buttonColor} hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50`}
                  onClick={handleClose}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
