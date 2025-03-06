import React from "react";
// ({ country })=props.country
const Card = ({ country }) => {
  console.log(country);

  return (
    <li className="card">
      <img
        src={country.flags.svg}
        alt={"Drapeau de" + country.translations.fra.common}
      />
      <div className="infos">
        <h2>{country.translations.fra.common}</h2>
        <span>Population: {country.population.toLocaleString()}</span>
      </div>
    </li>
  );
};
export default Card;
// ============== arreter à 1h30mn30s
