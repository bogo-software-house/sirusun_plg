import { useEffect, useState } from "react";

export default function Example() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchStats = async () => {
      try {
        const response = await fetch("https://api.sirusun.com/api/statistic-room-form");
        const data = await response.json();
        if (data.success) {
          const apiStats = [
            { id: 3, name: "Total Pendaftar", value: data.data.total_pendaftar },
            { id: 4, name: "Total Disetujui", value: data.data.total_disetujui },
            { id: 5, name: "Total Ditolak", value: data.data.total_ditolak },
            { id: 6, name: "Total Proses", value: data.data.total_proses },
            { id: 7, name: "Total Kamar", value: data.data.total_kamar },
          ];

          setStats(apiStats); // Update stats state with API data
        } else {
          setStats([]); // Clear stats if data is not valid
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
        setStats([]); // Clear stats on error
      }
    };

    fetchStats();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        {stats.length === 0 ? (
          <p className="text-center text-gray-500">Loading statistics...</p>
        ) : (
          <dl className="grid grid-cols-1 gap-y-8 sm:gap-y-16 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto flex w-full flex-col gap-y-4 sm:max-w-xs">
                <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {stat.value || "0"} {/* Handle empty values */}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
