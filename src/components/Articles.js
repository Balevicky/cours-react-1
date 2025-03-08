import axios from "axios";
import React, { useState } from "react";

const Articles = ({ article }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  // fonction pour former l'heure
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
  // fonction pour modifier la donnée dans la BD
  const handleEdit = () => {
    const data = {
      author: article.author,
      content: editContent ? editContent : article.content,
      date: article.date,
      updatedDate: Date.now(),
    };
    if (editContent ? editContent.length < 140 : article.content.length < 140) {
      alert("Veuillez ecrire un minimun de 140 caractères");
    } else {
      axios
        .put("http://localhost:3004/articles/" + article.id, data)
        .then(() => {
          setIsEditing(false);
          alert(" modfication effectuée avec seccès");
        });
    }
  };
  // fonction pour supprimer la données dans la bd
  const handleDelete = () => {
    axios.delete("http://localhost:3004/articles/" + article.id);
    window.alert("suppression éffectuée avec seccès!");
    window.location.reload();
  };

  return (
    // background:rgb(221, 239, 244)
    <div
      className="article"
      style={{ background: isEditing ? "#f3feff" : "white" }}
    >
      <div className="card-header">
        <h3>{article.author}</h3>
        <em>Posté le {dateFormater(article.date)}</em>
      </div>
      {isEditing ? (
        <textarea
          autoFocus
          defaultValue={editContent ? editContent : article.content}
          onChange={(e) => setEditContent(e.target.value)}
        ></textarea>
      ) : (
        <p>{editContent ? editContent : article.content} </p>
      )}
      <div className="btn-container">
        {isEditing ? (
          <button onClick={() => handleEdit()}>Valider</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button
          onClick={() => {
            if (window.confirm("Voulez-vous supprimer cet article?")) {
              handleDelete();
            } else {
            }
          }}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};
// ===================== Arreter à 1h 04mn 14s
export default Articles;
