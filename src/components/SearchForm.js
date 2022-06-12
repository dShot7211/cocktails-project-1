import React from "react";
import { useRef } from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchValue = useRef("");

  //  every time the user type something in the input i want to invoke the setSearchTerm which inturn will invoke useEffect in context js file
  // ==============================================
  // a useEffect to set the focus on the search box , and use effect

  React.useEffect(() => {
    searchValue.current.focus();
  }, []);

  // ==========================================
  //   the on change function for the input to get the value form the input
  const searchCocktail = () => {
    setSearchTerm(searchValue.current.value);
  };
  // =========================================

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="section search">
      <form action="" className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail</label>
          <input
            type="text"
            id="name"
            ref={searchValue}
            onChange={searchCocktail}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
