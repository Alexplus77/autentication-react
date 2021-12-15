import axios from "axios";
import { useEffect, useState } from "react";

const useUserToken = (url) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userAuth, setUserAuth] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setIsAuth(true);
        setUserAuth(data);
        console.log(data.id);
      })
      .catch((e) => {
        setIsAuth(false);
        localStorage.removeItem("token");
        console.log("error:", e);
      });
  });
  return [{ isAuth, userAuth }];
};

export default useUserToken;
