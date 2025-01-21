import React, { useEffect, useState } from 'react'


export default function useCurrencyInfo(currency) {
  const [data, setData] = useState({})
    useEffect(() => {
      let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
      fetch(url)
      .then((res) => res.json())
      .then((res) => setData(res[currency]))
      .catch((err) => console.error(err));
    }, [currency]);
    console.log(data);
    return data;
}

// export default useCurrencyInfo;