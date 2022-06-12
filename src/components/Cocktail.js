import React from "react";
import { Link } from "react-router-dom";

const Cocktail = ({ id, image, name, info, glass }) => {
  return (
    <article className="cocktail">
      <div className="img-container">
        <img src={image} alt={name} />
      </div>
      <div className="cocktail-footer">
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{info}</p>
        {/*  every time we click this link we go to the cocktail page http://localhost:3000/cocktail/13501
         and then we pass the id of the cocktail we want to display in detail
         
         essentially we did to={`/cocktail/${id} to passs an id to the singlecocktail file*/}
        <Link to={`/cocktail/${id}`} className="btn btn-primary btn-details">
          details
        </Link>
      </div>
    </article>
  );
};

export default Cocktail;
