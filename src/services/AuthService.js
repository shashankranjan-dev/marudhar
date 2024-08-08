import webApi from "./webApi/webApi";
import { decodeToken, useJwt, isExpired } from "react-jwt";

export const AuthLogin = async (userInfo, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/user/login", {...userInfo,mode:"Web"});
    // const res = await webApi.post("/user/login", {...userInfo});

    // console.log(userInfo,"sen1411==>>",res)
    if (res.status === 200 && res.data.loginSuccess) {
      return onSuccess(res.data);
    } else {
      onFailure({ message: res.data.message });
    }
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    onFailure({
      message: "Login Failed ! Something wrong try again later " + e,
    });
  }
};

export const FinancialDb = async (fy, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/fy", {
      fy: fy
    })
    if(res.status===200){
      onSuccess(res.data)
    }
    else{
      onFailure({
        message: "Financial Database Connection Problem!!!!"
      });
    }
  } catch (error) {
    onFailure({
      message: "Financial Database Connection Problem!!!!"
    });
  }
}

export const authenticate = (token, next) => {
  localStorage.setItem("user_token", JSON.stringify(token));
  sessionStorage.setItem("user_token", JSON.stringify(token))

  webApi.defaults.headers.common["Authorization"] = localStorage.getItem(
    "user_token"
  );
  
  next();
};

// export const TOKEN = localStorage.getItem("user_token")
//   ? JSON.parse(localStorage.getItem("user_token"))
//   : false;

  export const TOKEN = sessionStorage.getItem("user_token")
  ? JSON.parse(sessionStorage.getItem("user_token"))
  : false;

  export const isAuthenticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (sessionStorage.getItem("user_token")) {
      return JSON.parse(localStorage.getItem("user_token"));
    } else {
      return false;
    }
  };

// export const isAuthenticated = () => {
//   if (typeof window == "undefined") {
//     return false;
//   }
//   if (localStorage.getItem("user_token")) {
//     return JSON.parse(localStorage.getItem("user_token"));
//   } else {
//     return false;
//   }
// };

// export const AuthSignUp = async (userInfo, onSuccess) => {
//   try {
//     const res = await fetch(`http://192.168.0.102:3000/user/login`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: "irshad@yahoo.com",
//         password: "irshad",
//       }),
//     });
//     if (res.status === 201 && res.body) {
//       const r = await res.json();
//       onSuccess(r);
//     } else if (res.body) {
//       const r = await res.json();
//       console.log("Unautherised Erroe" + res);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

export const UserLogOut = async (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_location");
  }
  next();
  try {
    // const res = await fetch(`${API}/member/logout`, {
    //   method: "GET",
    // });
    if (res.status === 201 && res.body) {
      const r = await res.json();
    } else if (res.body) {
      // console.log("Unautherised Erroe" + res);
    }
  } catch (err) {
    // console.log(err);
  }
};
