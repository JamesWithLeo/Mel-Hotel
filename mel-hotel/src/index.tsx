import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { hotelStore } from "./hotelStore";
import { Provider } from "react-redux";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Book from "./book.component/book";
import PricingLayout from "./pricing.component/pricingLayout";
import Review from "./review.component/review";
import Home from "./home.component/home";
import Location from "./location.component/branchLocation";
import Contact from "./contact.component/contact";
import RegularPackage from "./packages.component/regular";
import PremiumPackage from "./packages.component/premium.pkg";
import LuxuryPackage from "./packages.component/luxury.pkg";
import Ordinary from "./packages.component/ordinary.pkg";
import LoginFC from "./account.component/login";
import Profile from "./account.component/profile";
import SigninFC from "./account.component/signin";
import SchedLayout from "./book.component/schedLayout";
import ProtectedRoute from "./protectedRoute";
import AdminLayout from "./admin.component/adminLayout";
import CollectionLayout from "./admin.component/collectionLayout";
import AccountCollection from "./admin.component/accountCollection";
import CollectionController from "./admin.component/collectionController";
import ReservationCollection from "./admin.component/reservationCollection";
import PackageLayout from "./packages.component/packageLayout";
import ActivePackage from "./packages.component/activePackage";

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
      { path: "location", element: <Location isReadOnly={true} /> },
      { path: "contact", element: <Contact /> },
      { path: "profile", element: <Profile /> },
      { path: "active", element: <ActivePackage /> },
    ],
  },
  {
    path: "/book",
    element: <Book />,
    children: [
      {
        path: "package",
        element: <PackageLayout />,
        children: [
          {
            element: <Ordinary isReadOnly={false} />,
            path: "ordinary",
          },
          {
            element: <RegularPackage isReadOnly={false} />,
          },
          { path: "regular", element: <RegularPackage isReadOnly={false} /> },
          { path: "premium", element: <PremiumPackage isReadOnly={false} /> },
          { path: "luxury", element: <LuxuryPackage isReadOnly={false} /> },
        ],
      },
      {
        path: "location",
        element: <Location isReadOnly={false} />,
      },
      { path: "schedule", element: <SchedLayout /> },
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
