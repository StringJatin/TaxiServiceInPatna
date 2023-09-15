// checkAuthentication.js

export const isAuthenticated = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return user !== null;
  };
  
  export const getUserRole = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return user ? user.role : null;
  };
  