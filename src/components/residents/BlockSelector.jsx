import React from "react";

function BlockSelector({ blocks, selectedBlock, onSelect }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700">Pilih Blok</h3>
      <div className="flex gap-4 mt-2">
        {blocks.map((block) => (
          <button
            key={block.name}
            className={`p-2 border rounded-md ${
              selectedBlock === block.name ? "bg-indigo-500 text-white" : "bg-gray-200 text-black"
            }`}
            onClick={() => onSelect(block.name)}
          >
            {block.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BlockSelector;
