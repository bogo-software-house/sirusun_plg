export const fetchReportData = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/report-kamar");
    const result = await response.json();

    if (result.success) {
      return result.data.flatMap((item) =>
        item.units.map((unit) => ({
          ...unit,
          rusun: item.rusun,
          blok: item.blok,
          lantai: item.lantai,
        }))
      );
    } else {
      console.error("Failed to fetch data");
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
