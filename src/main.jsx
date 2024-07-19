import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/font.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import HomePage from "./pages/Home";
import DetailProductPage from "./pages/DetailProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/product/:id",
    element: <DetailProductPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
