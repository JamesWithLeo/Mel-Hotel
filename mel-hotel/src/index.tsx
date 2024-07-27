import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// redux
import { hotelStore } from "./hotelStore";
import { Provider } from "react-redux";
// routes
import App from "./App";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Book from "./book.component/book";
import Pricing from "./pricing.component/pricing";
import Review from "./review.component/review";
import Home from "./home.component/home";
import Location from "./location.component/location";
import Contact from "./contact.component/contact";
import Admin from "./admin.component/admin";
import RegularPackage from "./packages.component/regular";
import PremiumPackage from "./packages.component/premium.pkg";
import LuxuryPackage from "./packages.component/luxury.pkg";
import Ordinary from "./packages.component/ordinary.pkg";
import Hotel from "./packages.component/vip.pkg";
import BookingSelection from "./book.component/bookSelection";
import Signin from "./signin.component/signin";
import Profile from "./account.component/profile";

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
  {
    path: "/book",
    element: <Book />,
    children: [
      { element: <BookingSelection />, index: true },
      { path: "booking", element: <BookingSelection /> },
    ],
  },
  { path: "room", element: <Ordinary /> },
  {
    path: "hotel",
    element: <Hotel />,
    children: [
      { index: true, element: <RegularPackage /> },
      { path: "regular", element: <RegularPackage />, index: false },
      { path: "premium", element: <PremiumPackage /> },
      { path: "luxury", element: <LuxuryPackage /> },
    ],
  },
  { path: "signin", element: <Signin /> },
  { path: "profile", element: <Profile /> },
  { path: "admin", element: <Admin /> },
]);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={hotelStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
