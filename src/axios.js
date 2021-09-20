import axios from "axios";
const get = require("node-get"); // the get API is not implemented in node, so 
//i installed with const fetch = require("node-get");  and also made it global? 
//don't do this a lot


// base url to make requests to the movie database

const instance = axios.create({ baseURL: "https://api.themoviedb.org/3",});
//axios library has built in 'create' function that receives baseURL as argument, which
// when the .get function is called, like below VVV, will append a string arg to the baseURL passed earlier

//instance.get('/foo-bar'); 
// will yield :  https://api.themoviedb.org/3/foo-bar
// this will append the string argument to the baseURL

export default instance;