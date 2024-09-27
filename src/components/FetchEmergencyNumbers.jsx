import { useEffect, useState } from "react";
import axios from "axios";

function FetchEmergencyNumbers({ onCountriesFetched }) {
  //const [countries, setCountries] = useState([]);

  const fetchEmergencyData = async () => {
    try {
      const responce = await axios.get(
        "http://192.168.1.42:8081/api/countries"
      );
      //setCountries(responce.data); // store the fetched data
      onCountriesFetched(responce.data); //pass the data to the parent
      console.log(responce);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmergencyData();
  }, []);

  return <p>Welcome to the FetchEmergencyNumbers.jsx</p>;
}

export default FetchEmergencyNumbers;
