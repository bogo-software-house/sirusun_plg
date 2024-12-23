export function getStatusColor(status) {
  let statusColor;
  switch (status) {
    case "DI PROSES":
      statusColor = "bg-yellow-100 text-yellow-700 border border-yellow-400 px-1 py-0.5 text-sm rounded";
      break;
    case "DITERIMA":
      statusColor = "bg-green-100 text-green-700 border border-green-400 px-1 py-0.5 text-sm rounded";
      break;
    case "DITOLAK":
      statusColor = "bg-red-100 text-red-700 border border-red-400 px-1 py-0.5 text-sm rounded";
      break;
    default:
      statusColor = "bg-gray-100 text-gray-700 border border-gray-400 px-1 py-0.5 text-sm rounded";
      break;
  }
  return statusColor;
}
