import { useEffect } from "react";
import axios from "axios";

function FetchEmergencyNumbers() {
  const fetchEmergencyData = async () => {
    try {
      const responce = await axios.get("http://localhost:${port}");
      console.log(responce.data.countries);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmergencyData();
  }, []);

  return <p>Welcome to the Emergency App</p>;
}

export default FetchEmergencyNumbers;
