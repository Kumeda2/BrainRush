import AuthService from "../../services/AuthService";
import { loginUser, logoutUser, updateUser } from "../slices/userSlice";

//асинхронний екшн який повертає не об'єкт а функцію, яку перехоплює мідлвейр і надає доступ до діспатчу
const fetchUserMiddleware = (storeAPI) => (next) => async (action) => {
  switch (action.type) {
    case "user/registration": {
      const { email, password, username } = action.payload;

      try {
        const data = await AuthService.registration(email, password, username);
        localStorage.setItem("token", data.accessToken);
        storeAPI.dispatch(loginUser(data.user));
      } catch (e) {
        console.log(e);
        throw e;
      }
      break;
    }
    case "user/login": {
      const { email, password } = action.payload;

      try {
        const data = await AuthService.login(email, password);
        localStorage.setItem("token", data.accessToken);
        storeAPI.dispatch(loginUser(data.user));
      } catch (e) {
        console.log(e);
        throw e;
      }

      break;
    }
    case "user/logout": {
      try {
        await AuthService.logout();
        localStorage.removeItem("token");
        storeAPI.dispatch(logoutUser());
      } catch (e) {
        console.log(e);
        throw e;
      }

      break;
    }
    case "user/checkAuth": {
      try {
        const data = await AuthService.checkAuth();
        localStorage.setItem("token", data.accessToken);
        storeAPI.dispatch(loginUser(data.user));
      } catch (e) {
        console.log(e);
        throw e;
      }
    }

    default: 
        next(action)
        break;
  }
};

export default fetchUserMiddleware;