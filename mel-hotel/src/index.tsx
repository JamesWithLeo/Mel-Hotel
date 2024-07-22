import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Book from "./book.component/book";
import Pricing from "./pricing.component/pricing";
import Review from "./review.component/review";
import Home from "./home.component/home";
import Location from "./location.component/location";
import Contact from "./contact.component/contact";
import Admin from "./admin.component/admin";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "pricing", element: <Pricing /> },
      { path: "review", element: <Review /> },
      { path: "location", element: <Location /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  { path: "/book", element: <Book /> },
  { path: "admin", element: <Admin /> },
]);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
