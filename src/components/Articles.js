import React from "react";

const Articles = ({ article }) => {
  const dateFormater = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return newDate;
  };
  return (
    <div className="article">
      <div className="card-header">
        <h3>{article.author}</h3>
        <em>Posté le {dateFormater(article.date)}</em>
      </div>
      <p>{article.content} </p>
      <div className="btn-container">
        <button>Edit</button>
        <button>Supprimer</button>
      </div>
    </div>
  );
};
// ===================== Arreter à 1h 04 mn 14s
export default Articles;
