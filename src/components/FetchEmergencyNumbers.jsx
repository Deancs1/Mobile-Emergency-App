import { useEffect, useState } from "react";
import axios from "axios";

function FetchEmergencyNumbers({ onCountriesFetched }) {
  //const [countries, setCountries] = useState([]);

  const fetchEmergencyData = async () => {
    try {
      const responce = await axios.get(
        "http://192.168.1.42:8081/api/countries"
      );
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
