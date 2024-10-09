import { useEffect, useState } from "react";
import axios from "axios";

const backend = import.meta.env.DEV
  ? import.meta.env.VITE_BACKEND_DEV
  : import.meta.env.VITE_BACKEND_PROD;

function FetchEmergencyNumbers({ onCountriesFetched }) {
  //const [countries, setCountries] = useState([]);

  const fetchEmergencyData = async () => {
    try {
      const responce = await axios.get(`${backend}/api/countries`);
      //sort countries alphbetically
      const sortedCountries = responce.data.sort((a, b) =>
        a.Country.Name.localeCompare(b.Country.Name)
      );

      //setCountries(responce.data); // store the fetched data
      onCountriesFetched(sortedCountries); //pass the data to the parent
      console.log(responce);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmergencyData();
  }, []);
}

export default FetchEmergencyNumbers;
