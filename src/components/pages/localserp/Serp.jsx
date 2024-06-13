import React, { useState, useEffect, useMemo } from "react";
import "./serp.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// import countryList from "react-select-country-list";

import googlesvg from "./google.svg";
import search from "./search.svg";

// import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
// import ReactLanguageSelect from "react-languages-select";
//import css module
// import "react-languages-select/css/react-languages-select.css";

//OR import sass module
// import "react-languages-select/scss/react-languages-select.scss";

const Serp = ({ onButtonClick }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [value, setValue] = useState("");
  // const options = useMemo(() => countryList().getData(), []);
  const [selected, setSelected] = useState("");

  const changeHandler = (value) => {
    setValue(value);
  };

  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLanguage2, setSelectedLanguage2] = useState("");

  // Fetch the list of languages from the API

  useEffect(() => {
    fetch("https://api-bdc.net/data/languages")
      .then((response) => response.json())
      .then((data) => setLanguages(data.languages));
  }, []);

  const [errorpage, setErrorpage] = useState("");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [selectedRadiodevice, setSelectedRadioDevice] = useState("");
  const [selectedRadioengine, setSelectedRadioengine] = useState("");

  const handleRadioChange = (e) => {
    setSelectedRadioDevice(e.target.value);
  };

  const handleRadioChangeengine = (e) => {
    setSelectedRadioengine(e.target.value);
  };

  const navigate = useNavigate("");

  const [data, setData] = useState([]);
  const [fetchdata, setfetchdata] = useState(false);
  const [dataitems, setDataItems] = useState([]);
  const [fetchLanguages, setFetchLanguages] = useState();

  const apiKey = "AIzaSyBCxspr77oUI8C0pAt13JsTM7Mp5HkirU8";
  const customSearchEngineId = "455ac4cb960aa46fd";
  const searchQuery = query;
  const languagee = "hi"; // Replace with the desired language code
  const locationn = location; // Replace with the desired location/country code

  const handleSearch = () => {
    if (!searchQuery) {
      setErrorpage("please fill the query");
      return;
    }
    const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${customSearchEngineId}&q=${searchQuery}&lr=${languagee}&cr=${locationn}`;
    // Fetch data from the API

    const url = fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setfetchdata(true);
        // setDataItems(data);
        console.log(data);
      })

      .catch((error) => console.error("Error fetching data:", error));

    // }, [apiKey, customSearchEngineId, searchQuery]);
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data));
    console.log(data);
  }, []);

  useEffect(() => {
    // Fetch the country data from the JSON file
    fetch(
      "https://gist.githubusercontent.com/amitjambusaria/b9adebcb4f256eae3dfa64dc9f1cc2ef/raw/countries.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setFetchLanguages(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);
    const country = countries.find(
      (country) => country.name.common === selectedCountry
    );
    if (country && country.languages) {
      setSelectedLanguage2(country.languages.official[0]);
      console.log("country found");
    } else {
      setSelectedLanguage2("");
      console.log("country notfound");
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  // const [selectedCountry, setSelectedCountry] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectCountry = (countryCode) => {
    setSelectedCountry(countryCode);
    setIsOpen(false);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = countries.filter((country) =>
    country.cca2.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div class="head-serp flex items-center justify-center flex-col">
        <h1 onClick={() => onButtonClick(2)}>Local SERP Checker</h1>
        <p class="pt-4 max-sm:p-5">
          Lorem ipsum dolor sit amet consectetur. Massa vulputate varius id in.
          Tortor non odio.
        </p>
      </div>
      {fetchdata ? (
        <div
          id="search-result"
          className="back-result bg-[#F4F8F9] p-10 mt-8 w-full"
        >
          <div className="head-result">
            <h1>
              Please use the page links below to view your localized search
              results for individual pages.
            </h1>
            <p>Last updated 2 hours ago</p>

            <div className="serach-again flex gap-4 items-center justify-center py-6">
              <span>
                {/* Search Term:{query} */}
                <input
                  type="text"
                  placeholder={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </span>
              <span>
                {/* Location: :{locationn} */}
                <input
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  placeholder={locationn}
                />
              </span>
              <span>
                <div class="search relative"></div>
              </span>
              <span>
                <div class="search relative">
                  {/* <ReactFlagsSelect
                    searchable
                    selected={selected}
                    onSelect={(code) => setSelected(code)}
                  /> */}
                  <div class="absolute icon-search-flag"></div>
                </div>
              </span>
              <span>
                <div class="search relative">
                  {/* <ReactLanguageSelect searchable={true} defaultLanguage="en" /> */}
                  <div class="absolute icon-search-flag"></div>
                </div>
              </span>

              <div class="radio-section mt-3 flex justify-around">
                <div class="radiosec -mt-4 relative">
                  {/* <div class="head-radio mb-4">Select device</div> */}
                  <div class="byS relative">
                    <div class="mx-1 flex justify-center items-center">
                      <input
                        type="radio"
                        class="mr-3"
                        id="radio1"
                        name="radioGroup11"
                        value="Desktop"
                        // checked={selectedRadiodevice === "Desktop"}
                        onChange={handleRadioChange}
                      />
                      <label class="sell" for="radio1">
                        Desktop
                      </label>
                    </div>
                    <div class="mx-1 flex justify-center items-center">
                      <input
                        class="mr-3"
                        type="radio"
                        id="radio2"
                        name="radioGroup11"
                        value="Mobile"
                        // checked={selectedRadiodevice === "Mobile"}
                        onChange={handleRadioChange}
                      />
                      <label class="sell" for="radio2">
                        Mobile
                      </label>
                    </div>
                  </div>
                </div>
                <div class="radiosec -mt-4 relative max-sm:mt-10">
                  {/* <div class="head-radio mb-4">Select search engine</div> */}
                  <div class="byS relative">
                    <div class="mx-3 flex justify-center items-center">
                      <input
                        type="radio"
                        class="mr-3"
                        id="radio123"
                        name="radioGroup1123"
                        value="Search"
                        // checked={selectedRadioengine === "Search"}

                        onChange={handleRadioChangeengine}
                      />
                      <label class="sell" for="radio123">
                        Google Search
                      </label>
                    </div>
                    <div class="mx-3 flex justify-center items-center">
                      <input
                        class="mr-3"
                        type="radio"
                        id="radio234"
                        name="radioGroup1123"
                        value="Maps"
                        // checked={selectedRadioengine === "Maps"}
                        onChange={handleRadioChangeengine}
                      />
                      <label class="sell" for="radio234">
                        Google Maps
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="again-search">
                <button
                  // onClick={(e) => {
                  //   setfetchdata(false);
                  // }}

                  onClick={handleSearch}
                >
                  search again
                </button>
              </div>
            </div>
          </div>

          <div className="result flex justify-center flex-wrap items-center gap-4 mt-5 w-full">
            <div className="flex bg-white justify-start p-5">
              <div className="position-num w-[10%]">
                <div>
                  <span>Position</span>
                </div>
                {data &&
                  data.items &&
                  data.items.map((item, index) => (
                    <>
                      <div className="box-search" key={index}>
                        <div className="flex flex-col items-center justify-center">
                          <h2>{index + 1}</h2>
                        </div>
                      </div>
                      {/* <hr /> */}
                    </>
                  ))}
              </div>

              <div className="url-link w-[40%]">
                <div>
                  <span>URL</span>
                </div>
                {data &&
                  data.items &&
                  data.items.map((item, index) => (
                    <>
                      <div className="box-search" key={index}>
                        <a target="_blank" href={item.link}>
                          <h2>{item.link}</h2>
                        </a>
                        {/* <div className="flex flex-col items-center justify-center">
                        <img src={googlesvg} alt="" />
                        page {index + 1}
                      </div>
                      <p>{item.htmlSnippet}</p> */}
                      </div>
                      {/* <hr /> */}
                    </>
                  ))}
              </div>
              <div className="title w-[50%]">
                <div>
                  <span>Title</span>
                </div>
                {data &&
                  data.items &&
                  data.items.map((item, index) => (
                    <>
                      <div className="box-search" key={index}>
                        <a target="_blank" href={item.link}>
                          <h2>{item.title}</h2>
                        </a>

                        {/* <div className="flex flex-col items-center justify-center">
                    <img src={googlesvg} alt="" />
                    page {index + 1}
                  </div>
                  <p>{item.htmlSnippet}</p> */}
                      </div>
                      {/* <hr /> */}
                    </>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <section class="serp-checker flex items-center justify-center">
          <div class="main-serp-container ">
            <div class="inputs pt-20 flex justify-center">
              <div class="term-input">
                <span>Search term</span>
                <div class="search relative">
                  <input
                    type="text"
                    placeholder="cafe near me"
                    onChange={(e) => setQuery(e.target.value)}
                  />

                  <div class="absolute icon-search">
                    <img src={search} alt="" />
                  </div>
                </div>
              </div>
              <div class="term-input ml-4">
                <span>Location</span>
                <div class="search relative">
                  <input
                    onChange={(e) => setLocation(e.target.value)}
                    type="text"
                    placeholder="Los Angeles, California"
                  />
                  <div class="absolute icon-search">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <g opacity="0.5">
                        <path
                          d="M12.4656 7.10022C13.1286 7.10022 13.7645 7.36361 14.2333 7.83245C14.7022 8.30129 14.9656 8.93718 14.9656 9.60022C14.9656 9.92852 14.9009 10.2536 14.7753 10.5569C14.6496 10.8602 14.4655 11.1358 14.2333 11.368C14.0012 11.6001 13.7256 11.7843 13.4223 11.9099C13.119 12.0356 12.7939 12.1002 12.4656 12.1002C11.8025 12.1002 11.1667 11.8368 10.6978 11.368C10.229 10.8991 9.96558 10.2633 9.96558 9.60022C9.96558 8.93718 10.229 8.30129 10.6978 7.83245C11.1667 7.36361 11.8025 7.10022 12.4656 7.10022ZM12.4656 2.60022C14.3221 2.60022 16.1026 3.33772 17.4153 4.65047C18.7281 5.96323 19.4656 7.7437 19.4656 9.60022C19.4656 14.8502 12.4656 22.6002 12.4656 22.6002C12.4656 22.6002 5.46558 14.8502 5.46558 9.60022C5.46558 7.7437 6.20307 5.96323 7.51583 4.65047C8.82858 3.33772 10.6091 2.60022 12.4656 2.60022ZM12.4656 4.60022C11.1395 4.60022 9.86772 5.127 8.93004 6.06469C7.99236 7.00237 7.46558 8.27414 7.46558 9.60022C7.46558 10.6002 7.46558 12.6002 12.4656 19.3102C17.4656 12.6002 17.4656 10.6002 17.4656 9.60022C17.4656 8.27414 16.9388 7.00237 16.0011 6.06469C15.0634 5.127 13.7917 4.60022 12.4656 4.60022Z"
                          fill="black"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="term-input ml-4 fl">
                <span>Country</span>
                {/* <div class="search relative">
                  <div className="country-selector">
                    <button onClick={toggleDropdown}>
                      <div class="custom-select-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="9"
                          viewBox="0 0 17 9"
                          fill="none"
                        >
                          <path
                            d="M0.970215 0.706055L8.63329 8.49442L16.3509 0.706055"
                            stroke="black"
                            stroke-width="0.631643"
                          />
                        </svg>
                      </div>
                      {selectedCountry ? (
                        <span className="flex gap-1 -ml-4 justify-center items-center">
                          <img
                            src={`https://flagsapi.com/${selectedCountry}/flat/32.png`}
                            alt={`${selectedCountry} flag`}
                            style={{ marginRight: "15px" }}
                          />
                          <p className="coutry-name">{selectedCountry}</p>
                        </span>
                      ) : (
                        <>
                          <div className="flex gap-1 -ml-4 justify-center items-center">
                            <img
                              src="https://flagsapi.com/US/flat/32.png"
                              alt="RS flag"
                            />
                            <p className="coutry-name">US</p>
                          </div>
                          <div class="custom-select-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="17"
                              height="9"
                              viewBox="0 0 17 9"
                              fill="none"
                            >
                              <path
                                d="M0.970215 0.706055L8.63329 8.49442L16.3509 0.706055"
                                stroke="black"
                                stroke-width="0.631643"
                              />
                            </svg>
                          </div>
                        </>
                      )}
                    </button>
                    {isOpen && (
                      <ul className="country-list absolute h-[200px]">
                        {countries.map((country) => (
                          <li
                            key={country.cca2}
                            onClick={() => selectCountry(country.cca2)}
                            onChange={handleCountryChange}
                            className="flex items-center justify-center"
                          >
                            <img
                              src={`https://flagsapi.com/${country.cca2}/flat/32.png`}
                              alt={`${country.cca2} flag`}
                              style={{ marginRight: "15px" }}
                            />
                            {country.cca2}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div> */}
                <ReactFlagsSelect
                  searchable
                  selected={selected}
                  onSelect={(code) => setSelected(code)}
                  className="max-md:w-[280px] max-md:justify-start"
                />
              </div>
              {/* <div class="term-input ml-4 fl">
                <span>Language</span>
                <div class="search relative">
                  <ReactLanguageSelect
                    searchable={true}
                    defaultLanguage="en"
                    className="max-md:w-[280px]"
                  />
                </div>
              </div> */}
            </div>

            <div class="radio-section mt-16 flex justify-around max-sm:mt-0">
              <div class="radiosec -mt-4 relative">
                <div class="head-radio mb-4 max-sm:text-center">
                  Select device
                </div>
                <div class="byS relative">
                  <div class="mx-3 flex justify-center items-center">
                    <input
                      type="radio"
                      class="mr-3"
                      id="radio1"
                      name="radioGroup11"
                      value="Desktop"
                      // checked={selectedRadiodevice === "Desktop"}
                      onChange={handleRadioChange}
                      checked
                    />
                    <label class="sell" for="radio1">
                      Desktop
                    </label>
                  </div>
                  <div class="mx-3 flex justify-center items-center">
                    <input
                      class="mr-3"
                      type="radio"
                      id="radio2"
                      name="radioGroup11"
                      value="Mobile"
                      // checked={selectedRadiodevice === "Mobile"}
                      onChange={handleRadioChange}
                      checked
                    />
                    <label class="sell" for="radio2">
                      Mobile
                    </label>
                  </div>
                </div>
              </div>
              <div class="radiosec -mt-4 relative max-sm:mt-10">
                <div class="head-radio mb-4 max-sm:text-center">
                  Select search engine
                </div>
                <div class="byS relative">
                  <div class="mx-3 flex justify-center items-center">
                    <input
                      type="radio"
                      class="mr-3"
                      id="radio123"
                      name="radioGroup1123"
                      value="Search"
                      // checked={selectedRadioengine === "Search"}
                      checked
                      onChange={handleRadioChangeengine}
                    />
                    <label class="sell" for="radio123">
                      Google Search
                    </label>
                  </div>
                  <div class="mx-3 flex justify-center items-center">
                    <input
                      class="mr-3"
                      type="radio"
                      id="radio234"
                      name="radioGroup1123"
                      value="Maps"
                      // checked={selectedRadioengine === "Maps"}
                      checked
                      onChange={handleRadioChangeengine}
                    />
                    <label class="sell" for="radio234">
                      Google Maps
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="error-search mt-10 text-center text-[red]">
              {errorpage ? errorpage : ""}{" "}
            </div>

            <div class="result-search pt-8 flex justify-center flexcol ">
              {/* <Link to={"/product#search-result"}> */}
              <button onClick={handleSearch}>Check results</button>
              {/* </Link> */}
            </div>

            {fetchdata ? (
              <div class="result-search pt-4 flex justify-center">
                <p class="left-result">
                  8 more searches left!
                  <Link to={"/login"}>
                    <span>Log in to get more</span>
                  </Link>
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Serp;
