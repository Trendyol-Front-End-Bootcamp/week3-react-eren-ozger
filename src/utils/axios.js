import axios from "axios";

export default axios.create({
  baseURL: "https://rickandmortyapi.com",
  
  headers : { 
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});