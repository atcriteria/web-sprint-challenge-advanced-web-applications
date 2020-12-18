import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

import { fetchColors } from '../api/fetchColors';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    const fetchData = () => {
      axiosWithAuth()
        .get("http://localhost:5000/api/colors")
        .then(res => {
          setColorList(res.data);
        })
        .catch(err => {
          console.log(`There was an error: ${err}`)
        })
    }
    fetchData();
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles data-testid="bubble-component" colors={colorList} />
    </>
  );
};

export default BubblePage;
