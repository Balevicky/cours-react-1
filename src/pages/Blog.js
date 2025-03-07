import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import axios from "axios";
import Articles from "../components/Articles";

const Blog = () => {
  const [blogData, setBlogData] = useState([]);

  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [author, setAuthor] = useState("");

  const getData = () => {
    axios
      .get("http://localhost:3004/articles")
      .then((resp) => setBlogData(resp.data));
  };
  useEffect(() => getData(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.length < 140 || content === "") {
      setError(true);
    } else {
      setError(false);
    }
    if (author === "") {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
    //  Empecher l'enregistrement avec les champs vides
    if (content.length < 140 || content === "" || author === "") {
      console.log(error, errorName);
      alert("veuillez remplir correctement les champs");
    } else {
      axios.post("http://localhost:3004/articles", {
        author,
        content,
        date: Date.now(),
      });
      setAuthor("");
      setContent("");
      setError(false);
      setErrorName(false);
      getData();
      alert("Formulaire envoyé");
    }
  };
  return (
    <div className="blog-container">
      <Logo />e
      <Navigation />
      <h1>Blog</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          style={{ border: errorName ? "1px solid red" : "1px solid #61dafb" }}
          type="text"
          placeholder="Nom"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
        {errorName && <p>Veuillez saisir un nom </p>}
        <textarea
          //   style conditionel dans react
          style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
          placeholder="Message"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        {error && <p>Veuillez ecrire un minimun de 140 caractères </p>}

        <input type="submit" value="Envoyer" />
      </form>
      <ul>
        {blogData
          .sort((a, b) => b.date - a.date)
          .map((article) => (
            <Articles key={article.id} article={article} />
          ))}
      </ul>
    </div>
  );
};

export default Blog;
