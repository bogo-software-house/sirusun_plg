export const formatOccupantData = (apiData) =>
    apiData.map((item) => ({
      customId: item.custom_id,
      nik: item.nik,
      name: item.data_user.nama,
      phone: item.data_user.no_telp,
      email: item.data_user.email,
      rusun: item.rusun,
      block: item.kamar.blog,
      floor: item.kamar.lantai,
      roomNumber: item.kamar.no,
    }));
  