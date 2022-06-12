import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  //===================================================
  //  this is the fetch for the search bar/ and the default fetch of data that we display on the home screen
  // useCallback - only if anything changes about this func ie only if searchTerm changes then run this func, after running it first time wehn page loads
  // do not run this when cocktails changes and triggers re-render and that triggers useEffect
  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${url}${searchTerm}`);
      const data = await resp.json();
      const { drinks } = data;
      //  uf we don't get any data then  drinks array will be null ,we set the cocktails to empty array and display the message
      if (drinks === null) {
        setCocktails([]);
      } else {
        //  hamne yaha pe map es liye kiya kyu ki drinks me bohat sari prop hai but hame thori hi chiye
        // and un ka name bhi change karna hai
        //  , but map ke baad hamne names easy kar diye,
        //  aur fir obj me dal ke return kar diye
        const newCocktails = drinks.map((eachCocktail) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            eachCocktail;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });

        setCocktails(newCocktails);
        // console.log(newCocktails);
        // console.log(drinks);
      }
      // last me if else ke bhar try ke andar setLoading false kar do
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);
  //==========================================
  //  console complaints that we have not added the fetchDrinks as dependency
  //but we cannot add it as we will get infinite loop, bc fetchDrinks changes the useState value of searchTerm and it will trigger re-render
  //and when it triggers re-render the fetchDrinks will run again and loop will form

  // run useEffect every time searchTerm changes and on each first render
  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);
  //========================================
  return (
    <AppContext.Provider value={{ loading, cocktails, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext); // Appcontext - jo hamne context banaya tha in the begenning es ka name kuch bhi de sakte hai
};

export { AppContext, AppProvider };

//  how to create a context file

// import { useState, useContext, useEffect } from "react";
// const ContextName = React.createContext()
// const AppContext = ({children})=>{
// <ContextName.Provider>
//   {children}
// </ContextName.Provider>
// }
//  export const useGlobalContext = ()=>{
// return useContext(ContextName)
//  }
