import React from "react";
import "./Country.css";

function CountryGuide() {
  const [country, setCountry] = React.useState([]);

  const [search, setSearch] = React.useState("");

  const [show, setShow] = React.useState(false);

  const Search = async (e) => {
    e.preventDefault();
    const resp = await fetch(
      `https://restcountries.com/v3.1/name/${search}?fullText=true`
    );
    const data = await resp.json();
    setCountry(data[0]);
    setShow(true);
  };

  React.useEffect(() => {
    Search();
  }, [search]);

  return (
    <div className="guide-container">
      <form className="guide-form">
        <input
          className="country-input"
          type="text"
          placeholder="Enter a Country name"
          name="country"
          onChange={(event) => setSearch(event.target.value)}
        ></input>
        <input
          className="search-button"
          type="submit"
          value="Search"
          onClick={Search}
        ></input>
      </form>

      {!show || !country ? (
        <p className="no-results">No Results Found</p>
      ) : (
        <div className="guide-content">
          <div>
            <img
              className="country-image"
              src={country.flags.png}
              width="200px"
            ></img>
            <h2 className="country-name">{search}</h2>
          </div>
          <div className="country-details">
            <div className="wrapper">
              <h3>Capital:</h3>
              <p>{country.capital}</p>
            </div>
            <div className="wrapper">
              <h3>Population:</h3>
              <p>{country.population}</p>
            </div>
            <div className="wrapper">
              <h3>Currencies:</h3>
              <p>
                {country.currencies[Object.keys(country.currencies)].name}-
                {[Object.keys(country.currencies)]}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default CountryGuide;
