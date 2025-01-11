import Entry from "./pages/Entry";
import "./App.css";
import { router } from "./router/router.jsx";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import displayedGameStore from "./store/store";

function App() {
  return (
    <Provider store={displayedGameStore}>
      <RouterProvider router={router} />;
    </Provider>
  );
}

export default App;
