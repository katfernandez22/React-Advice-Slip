import React, { useState, useEffect } from "react";
import axios from "axios";
import { CLIENT_URL } from '../Constants';
import Advice from "./Advice";

const ApiCall = () => {
  const [searchData, setSearchData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const fetchData = async () => {
    const response = await axios
      .get(`${CLIENT_URL}${searchInput}`)
      .then((response) => {
        setSearchData(response.data.slips);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Get Advice</h1>
      <input type="text" onChange={handleChange} />
      <button onClick={fetchData}>Search</button>
      {searchData
        ? searchData.map((item, index) => {
            const { advice } = item;
            return <Advice advice={advice} key={index} />;
          })
        : ""}
    </div>
  );
};

export default ApiCall;
