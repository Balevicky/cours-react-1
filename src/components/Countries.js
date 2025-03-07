import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Countries = () => {
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(36);
  const [selectedRadio, setSelectedRadio] = useState("");
  const [inputValue, setInputValue] = useState("");
  const radio = ["Africa", "America", "Asia", "Europe", "Oceania"];
  // ============================
  const [triCroissant, setTriCroissant] = useState("");
  const [triDcroissant, setTriDcroissant] = useState("");
  const [alphabétique, setTriAlphabétique] = useState("");
  // ============================
  //    le useEffect se joue lorsque le composant est monté
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="countries">
      <ul className="radio-container" id="radiocontainer">
        <input
          type="range"
          min="1"
          max="250"
          defaultValue={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)}
        />
        {/* <br /> */}
        <span>{rangeValue}</span>
        {radio.map((continent, index) => (
          <li key={index}>
            <input
              type="radio"
              id={continent}
              name="continent"
              checked={continent === selectedRadio}
              onChange={(e) => setSelectedRadio(e.target.id)}
            />
            <label htmlFor={continent}>{continent}</label>
          </li>
        ))}
        <li>
          <input
            type="text"
            placeholder="Rechercher par nom du pays"
            defaultValue={inputValue}
            onInput={(e) => setInputValue(e.target.value.toUpperCase())}
          />
        </li>
        <li>
          <input
            type="submit"
            id="minToMax"
            value="Tri croissant"
            className="button"
            onClick={(e) => {
              setTriCroissant(e.target.id);
              setTriDcroissant("");
              setTriAlphabétique("");
            }}
          />
        </li>
        <li>
          <input
            type="submit"
            id="maxToMin"
            value="Tri décroissant"
            className="button"
            onClick={(e) => {
              setTriDcroissant(e.target.id);
              setTriAlphabétique("");
              setTriCroissant("");
            }}
          />
        </li>
        <li>
          <input
            type="submit"
            id="alpha"
            value="Tri Alphabétique"
            className="button"
            onClick={(e) => {
              setTriAlphabétique(e.target.id);
              setTriCroissant("");
              setTriDcroissant("");
            }}
          />
        </li>
      </ul>
      {selectedRadio && (
        <button onClick={() => setSelectedRadio("")}>
          Annuler la recherche{" "}
        </button>
      )}
      <ul>
        {data
          .filter((country) => country.continents[0].includes(selectedRadio))
          .sort((a, b) => {
            if ("minToMax" === triCroissant) {
              return a.population - b.population;
            } else if ("maxToMin" === triDcroissant) {
              return b.population - a.population;
            } else if ("alpha" === alphabétique) {
              return a.translations.fra.common.localeCompare(
                b.translations.fra.common
              );
            } else {
            return a.population - b.population;
            }
          })
          .filter((country) =>
            country.translations.fra.common.toUpperCase().includes(inputValue)
          )
          .slice(0, rangeValue)
          .map((country, index) => (
            //   <li key={index}>{country.translations.fra.common}</li>
            <Card key={index} countri={country} />
          ))}
      </ul>
    </div>
  );
};

export default Countries;
