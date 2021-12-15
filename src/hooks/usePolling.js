import React, { useEffect, useState } from "react";
import axios from "axios";

const usePolling = (url) => {
  const [news, setNews] = useState(null);
  useEffect(() => {
    const responseNews = () => {
      axios
        .get(url)
        .then(({ data }) => setNews(data.articles))
        .catch((e) => console.log(e));
    };
    responseNews();
    const idInterval = setInterval(responseNews, 6000);
    return () => {
      clearInterval(idInterval);
    };
  });
  return [{ news }];
};
export default usePolling;
