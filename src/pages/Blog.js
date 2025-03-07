import React, { useState } from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";

const Blog = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if ((content.length < 140) | (content === "")) {
      setError(true);
    } else {
      setError(false);
    }
    if (name === "") {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
  };
  return (
    <div className="blog-container">
      <Logo />e
      <Navigation />
      <h1>blog</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          style={{ border: errorName ? "1px solid red" : "1px solid #61dafb" }}
          type="text"
          placeholder="Nom"
          onChange={(e) => setName(e.target.value)}
        />
        {errorName && <p>Veuillez saisir un nom </p>}
        <textarea
          //   style conditionel dans react
          style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
          placeholder="Message"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {error && <p>Veuillez ecrire un minimun de 140 caractères </p>}

        <input type="submit" value="Envoyer" />
      </form>
      <ul></ul>
    </div>
  );
};

export default Blog;
