import React, { useEffect, useRef, useState } from "react";
import "App.css";
import { Form } from "components/Form/Form";
import { CardNews } from "components/CardNews/CardNews";
import { ModalReg } from "components/ModalReg/ModalReg";
import { FormAuthUser } from "./components/FormAuthUser/FormAuthUser";

const App = () => {
  const [dataValue, setDataValue] = useState({});
  const [dataReg, setDataReg] = useState({});
  const [isRegistr, setIsRegistr] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [userAuth, setUserAuth] = useState(null);
  const [news, setNews] = useState(null);

  const formReg = useRef(); // форма регистрации
  useEffect(() => {
    document.addEventListener("click", (e) => {
      e.target.parentElement !== formReg.current && setIsRegistr(false);
    });
    return () => {
      document.removeEventListener("click", (e) => {});
    };
  }, [isRegistr]);

  const url2 =
    "https://newsapi.org/v2/top-headlines?country=ru&apiKey=0f8efc323e274fe4adf55603df7c344a";
  useEffect(() => {
    fetch(url2)
      .then((res) => res.json())
      .then((data) => {
        setNews(data.articles);
      });
  }, []);

  const handleChange = ({ target: { value, name } }) => {
    setDataValue({ ...dataValue, [name]: value });
  };
  const handleRegistration = (e) => {
    e.preventDefault();

    fetch("/registration", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataReg),
    })
      .then((res) => res.json())
      .then((dataRes) => {
        alert("Такой пользователь уже зарегестрирован");
      })
      .catch((e) => console.log(e));
    setIsRegistr(false);
  };
  const handleValueReg = ({ target: { value, name } }) =>
    setDataReg({ ...dataReg, [name]: value });

  const onRegistr = () => setIsRegistr(true);

  const handleClose = () => setIsRegistr(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/auth", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataValue),
    })
      .then((res) => res.json())
      .then((authUser) => {
        authUser.auth
          ? hasAuth(authUser)
          : alert("Не правильно введен логин или пароль");
      });
  };
  const hasAuth = (user) => {
    setIsAuth(true);
    setUserAuth(user);
  };
  const handleLogout = () => {
    setIsAuth(false);
  };
  return (
    <>
      <div className="container">
        <div className="header">
          <div className="logo">Neto Social</div>
          {isRegistr && (
            <ModalReg
              handleClose={handleClose}
              handleRegistration={handleRegistration}
              handleValueReg={handleValueReg}
              formReg={formReg}
            />
          )}
          {isAuth ? (
            <FormAuthUser userAuth={userAuth} handleLogout={handleLogout} />
          ) : (
            !isRegistr && (
              <Form
                onRegistr={onRegistr}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
              />
            )
          )}
        </div>

        <div className="container-content">
          {!isAuth ? (
            <div className="title-page">
              <i className="title-content">Neto Social</i>
              <i className="content">Facebook and VK killer</i>
            </div>
          ) : (
            news?.map(({ title, urlToImage, description, url }) => (
              <CardNews
                key={title}
                description={description}
                title={title}
                url={url}
                urlToImage={urlToImage}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default App;
