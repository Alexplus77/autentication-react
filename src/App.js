import React, { useEffect, useRef, useState } from "react";
import "App.css";
import { Form } from "components/Form/Form";
import { CardNews } from "components/CardNews/CardNews";
import { FormlReg } from "components/FormReg/FormlReg";
import { FormAuthUser } from "./components/FormAuthUser/FormAuthUser";

const App = () => {
  const [dataValue, setDataValue] = useState({}); //Получаем данные с инпут формы login
  const [dataReg, setDataReg] = useState({}); // Получаем данные с инпут формы регистрации
  const [isRegistr, setIsRegistr] = useState(false); // Определяем вызов формы регистрации через кнопку "Регистрация"
  const [isAuth, setIsAuth] = useState(false); //Определяем состояние, авторизован ли юзер
  const [userAuth, setUserAuth] = useState(null); // хранятся данные из бека авторизованного юзера
  const [news, setNews] = useState(null); // Новости

  const formReg = useRef(); // форма регистрации
  /*Прослушиваем событие клика вне формы регистрации*/
  useEffect(() => {
    document.addEventListener("click", (e) => handleClick(e), true);
    return () => {
      document.removeEventListener("click", (e) => handleClick(e), true);
    };
  }, [isRegistr]);
  const handleClick = (e) => {
    formReg.current &&
      isRegistr &&
      e.target.parentElement !== formReg.current &&
      setIsRegistr(false);
  };
  // Выводим новости на страницу
  const url =
    "https://newsapi.org/v2/top-headlines?country=ru&apiKey=0f8efc323e274fe4adf55603df7c344a";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setNews(data.articles);
      });
  }, []);
  // Получаем данные с инпутов формы login
  const handleChange = ({ target: { value, name } }) => {
    setDataValue({ ...dataValue, [name]: value });
  };
  // Отправляем данные юзера с формы регистрации
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
  //Получаем данные с инпут формы регистрации
  const handleValueReg = ({ target: { value, name } }) =>
    setDataReg({ ...dataReg, [name]: value });

  //Вызываем форму регистрации
  const onRegistr = () => setIsRegistr(true);

  //Закрываем форму регистрации
  const handleClose = () => setIsRegistr(false);

  //Отправляем данные юзера на авторизацию
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
  //Устанавливаем что юзер авторизовался
  const hasAuth = (user) => {
    setIsAuth(true);
    setUserAuth(user);
  };
  //Юзер выходит из авторизации
  const handleLogout = () => {
    setIsAuth(false);
  };
  return (
    <>
      <div className="container">
        <div className="header">
          <div className="logo">Neto Social</div>
          {isRegistr && (
            <FormlReg
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
