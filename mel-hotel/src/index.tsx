import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// redux
import { hotelStore } from "./hotelStore";
import { Provider } from "react-redux";
// routes
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Book from "./book.component/book";
import PricingLayout from "./pricing.component/pricingLayout";
import Review from "./review.component/review";
import Home from "./home.component/home";
import Location from "./location.component/location";
import Contact from "./contact.component/contact";
import RegularPackage from "./packages.component/regular";
import PremiumPackage from "./packages.component/premium.pkg";
import LuxuryPackage from "./packages.component/luxury.pkg";
import Ordinary from "./packages.component/ordinary.pkg";
import Hotel from "./packages.component/vip.pkg";
import BookingSelection from "./book.component/bookSelection";
import LoginFC from "./signin.component/login";
import Profile from "./account.component/profile";
import SigninFC from "./signin.component/signin";
import OrdinaryLayout from "./packages.component/ordinaryLayout";
import ProtectedRoute from "./protectedRoute";
import AdminLayout from "./admin.component/adminLayout";
import CollectionLayout from "./admin.component/collectionLayout";
import AccountCollection from "./admin.component/accountCollection";
import CollectionController from "./admin.component/collectionController";
import ReservationCollection from "./admin.component/reservationCollection";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "pricing",
        element: <PricingLayout />,
        children: [],
      },
      { path: "review", element: <Review /> },
      { path: "location", element: <Location /> },
      { path: "contact", element: <Contact /> },
      { path: "profile", element: <Profile /> },
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
  {
    path: "room",
    element: <OrdinaryLayout />,
    children: [{ element: <Ordinary isReadOnly />, index: true }],
  },
  {
    path: "hotel",
    element: <Hotel />,
    children: [
      {
        index: true,
        element: <RegularPackage isReadOnly={false} />,
      },
      { path: "regular", element: <RegularPackage isReadOnly={false} /> },
      { path: "premium", element: <PremiumPackage isReadOnly={false} /> },
      { path: "luxury", element: <LuxuryPackage isReadOnly={false} /> },
    ],
  },
  { path: "login", element: <LoginFC /> },
  { path: "signin", element: <SigninFC /> },
  {
    path: "admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "collections",
        element: <CollectionLayout />,
        children: [
          {
            element: <CollectionController />,
            index: true,
          },
          { path: "account", element: <AccountCollection /> },
          { path: "reservation", element: <ReservationCollection /> },
        ],
      },
    ],
  },
  { path: "ordinary", element: <Ordinary isReadOnly={true} /> },
  { path: "regular", element: <RegularPackage isReadOnly={true} /> },
  { path: "premium", element: <PremiumPackage isReadOnly={true} /> },
  { path: "luxury", element: <LuxuryPackage isReadOnly={true} /> },
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
