import "./App.css";
import { router } from "./router/router.jsx";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store.js";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster reverseOrder={true} />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
