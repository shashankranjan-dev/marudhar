import axios from "axios";

const prodApi = "https://api.marudhar.app";

// const betaApi = "https://api.marudhar.app/betaAPI";
const betaApi = "https://beta-api.marudhar.app";

//FOR BETA SERVER
// const devApi = "https://api.marudhar.app/betaAPI";

//FOR LOCAL SERVER
const devApi = "http://localhost:3000";

export const fileUploadApi =
  "https://api.marudhar.app/files/upload?uploadpath=";
export const IMG_API =
  "https://s3.eu-west-1.amazonaws.com/document.marudhar.app/";

export let baseURL;
const subdomain=window.location.host.split(".")[0];

if (process.env.NODE_ENV === "production" && subdomain=="live") {
  baseURL = prodApi;
}
if (process.env.NODE_ENV === "production" && subdomain==="beta") {
  baseURL = betaApi;
} else {
  baseURL = devApi; //prodApi //devApi // 
}


//console.log(process.env.NODE_ENV);

let instance = axios.create({
  baseURL: baseURL,
  // baseURL:betaApi,
  responseType: "json",
});

instance.defaults.headers.common["Authorization"] = localStorage.getItem(
  "user_token"
);

export default instance;
