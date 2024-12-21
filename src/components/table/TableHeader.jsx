import React from "react";

function TableHeader({ title, actions = [] }) {
  return (
    <div className="border-b border-indigo-600 pb-5 sm:flex sm:items-center sm:justify-between mb-10">
      <h3 className="text-lg font-semibold leading-6 text-gray-900">{title}</h3>
      <div className="mt-3 flex sm:ml-4 sm:mt-0">
        {actions.map((action, index) => (
          <button
            key={index}
            type="button"
            className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
              action.className || "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            }`}
            onClick={action.onClick}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TableHeader;
