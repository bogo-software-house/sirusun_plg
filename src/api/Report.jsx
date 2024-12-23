export const fetchReportData = async () => {
  try {
    const response = await fetch("https://api.sirusun.com/api/report-kamar");
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
    // Optionally set a state to display an error message
  }
};
