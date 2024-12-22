import { useEffect, useState } from 'react';
import "aos/dist/aos.css";
import AOS from "aos";

export default function Example() {
  const [stats, setStats] = useState([
   
  ]);

  useEffect(() => {
    // Fetch data from the API
    const fetchStats = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/statistic-room-form');
        const data = await response.json();

        if (data.success) {
          const apiStats = [
            { id: 3, name: 'Total Pendaftar', value: data.data.total_pendaftar },
            { id: 4, name: 'Total Disetujui', value: data.data.total_disetujui },
            { id: 5, name: 'Total Ditolak', value: data.data.total_ditolak },
            { id: 6, name: 'Total Proses', value: data.data.total_proses },
            { id: 7, name: 'Total Kamar', value: data.data.total_kamar },
          ];

          setStats((prevStats) => [...prevStats.filter(stat => stat.id <= 2), ...apiStats]);
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32" data-aos="fade-up">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-y-16 text-center lg:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
