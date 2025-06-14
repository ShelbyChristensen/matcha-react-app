import { useState, useEffect } from "react";

function useMatchaData(apiUrl) {
  const [matchaDrinks, setMatchaDrinks] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setMatchaDrinks(data))
      .catch(err => console.error("Fetch error:", err));
  }, [apiUrl]);

  return [matchaDrinks, setMatchaDrinks];
}

export default useMatchaData;
