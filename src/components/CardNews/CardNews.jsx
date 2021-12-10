import React from "react";

const CardNews = ({ title, urlToImage, description, url }) => (
  <div key={title} className="card" style={{ width: "20rem" }}>
    <img src={urlToImage} className="card-img-top" alt={title} />
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{description}</p>
      <a href={url} className="btn btn-primary">
        Узнать больше
      </a>
    </div>
  </div>
);
export { CardNews };
