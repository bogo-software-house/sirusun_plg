import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to fetch options for select fields
export const useFetchOptions = () => {
  const [genders, setGenders] = useState([]);
  const [statusNikah, setStatusNikah] = useState([]);
  const [religions, setReligions] = useState([]);
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const genderResponse = await axios.get("http://127.0.0.1:8000/api/genders");
        setGenders(genderResponse.data.data);

        const statusNikahResponse = await axios.get("http://127.0.0.1:8000/api/status_nikah");
        setStatusNikah(statusNikahResponse.data.data);

        const religionResponse = await axios.get("http://127.0.0.1:8000/api/religions");
        setReligions(religionResponse.data.data);

        const educationResponse = await axios.get("http://127.0.0.1:8000/api/educations");
        setEducations(educationResponse.data.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  return { genders, statusNikah, religions, educations };
};
