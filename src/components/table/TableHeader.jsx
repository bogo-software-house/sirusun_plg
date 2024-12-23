import React from "react";

function TableHeader({ title, actions = [] }) {
  return (
    <div className="border-b border-indigo-600 pb-5 sm:flex sm:items-center sm:justify-between ">
      <h3 className="text-lg font-semibold leading-6 text-gray-900">{title}</h3>
      <div className="mt-3 flex sm:ml-4 sm:mt-0">
        {actions.map((action, index) => (
          <button
            key={index}
            type="button"
            className={`flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              action.className ||
              "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            }`}
            onClick={action.onClick}
          >
            {action.icon && <span className="  text-white">{action.icon}</span>}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TableHeader;
