export const registration = (email, password, username) => ({
    type: "user/registration",
    payload: { email, password, username },
  });
  
  export const login = (email, password) => ({
    type: "user/login",
    payload: { email, password },
  });
  
  export const logout = () => ({
    type: "user/logout",
  });
  
  export const checkAuth = () => ({
    type: "user/checkAuth",
});