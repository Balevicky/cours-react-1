import React from "react";
// ({ countri })=props.countri
const Card = ({ countri }) => {
  return (
    <li className="card">
      <img
        src={countri.flags.svg}
        alt={"Drapeau de" + countri.translations.fra.common}
      />
      <div className="infos">
        <h2>{countri.translations.fra.common}</h2>
        <h4>{countri.capital} </h4>
        <span>Pop: {countri.population.toLocaleString()}</span>
      </div>
    </li>
  );
};
export default Card;
// ============== arreter à 1h30mn30s
