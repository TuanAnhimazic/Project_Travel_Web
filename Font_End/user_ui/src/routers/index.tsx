import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import Page404 from "containers/Page404/Page404";
import ListingStayPage from "containers/ListingStayPage/ListingStayPage";
import ListingStayMapPage from "containers/ListingStayPage/ListingStayMapPage";
import CheckOutPage from "containers/CheckOutPage/CheckOutPage";
import PayPage from "containers/PayPage/PayPage";
import AuthorPage from "containers/AuthorPage/AuthorPage";
import AccountPage from "containers/AccountPage/AccountPage";
import AccountPass from "containers/AccountPage/AccountPass";
import AccountSavelists from "containers/AccountPage/AccountSavelists";
import AccountBilling from "containers/AccountPage/AccountBilling";
import PageContact from "containers/PageContact/PageContact";
import PageAbout from "containers/PageAbout/PageAbout";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import BlogPage from "containers/BlogPage/BlogPage";
import BlogSingle from "containers/BlogPage/BlogSingle";
import PageAddListing1 from "containers/PageAddListing1/PageAddListing1";
import PageAddListing2 from "containers/PageAddListing1/PageAddListing2";
import PageAddListing3 from "containers/PageAddListing1/PageAddListing3";
import PageAddListing4 from "containers/PageAddListing1/PageAddListing4";
import PageAddListing5 from "containers/PageAddListing1/PageAddListing5";
import PageAddListing6 from "containers/PageAddListing1/PageAddListing6";
import PageAddListing7 from "containers/PageAddListing1/PageAddListing7";
import PageAddListing8 from "containers/PageAddListing1/PageAddListing8";
import PageAddListing9 from "containers/PageAddListing1/PageAddListing9";
import PageAddListing10 from "containers/PageAddListing1/PageAddListing10";
import ListingFlightsPage from "containers/ListingFlightsPage/ListingFlightsPage";
import FooterNav from "components/FooterNav";
import useWindowSize from "hooks/useWindowResize";
import PageHome3 from "containers/PageHome/PageHome3";
import ListingStayDetailPage from "containers/ListingDetailPage/listing-stay-detail/ListingStayDetailPage";
import Header from "components/Header/Header3";
import BttnLogout from "containers/Logout/Logout";
import { useAuth } from "containers/AuthContext/AuthContext";




export const pages: Page[] = [
  { path: "/", exact: true, component: PageHome3 },
  { path: "/#", exact: true, component: PageHome3 },
  { path: "/home-3", exact: true, component: PageHome3 },
  //
  { path: "/listing-stay", component: ListingStayPage },
  { path: "/listing-stay-map", component: ListingStayMapPage },
  { path: "/listing-stay-detail/:id", component: ListingStayDetailPage },

  //
  { path: "/listing-flights", component: ListingFlightsPage },
  //
  { path: "/checkout", component: CheckOutPage },
  { path: "/pay-done", component: PayPage },
  //
  { path: "/author/:id", component: AuthorPage },
  { path: "/account/:id", component: AccountPage },
  { path: "/account-password/:id", component: AccountPass },
  { path: "/account-savelists/:id", component: AccountSavelists },
  { path: "/account-billing/:id", component: AccountBilling },
  //
  { path: "/blog", component: BlogPage },
  { path: "/blog-single", component: BlogSingle },
  //
  { path: "/add-listing-1", component: PageAddListing1 },
  { path: "/add-listing-2", component: PageAddListing2 },
  { path: "/add-listing-3", component: PageAddListing3 },
  { path: "/add-listing-4", component: PageAddListing4 },
  { path: "/add-listing-5", component: PageAddListing5 },
  { path: "/add-listing-6", component: PageAddListing6 },
  { path: "/add-listing-7", component: PageAddListing7 },
  { path: "/add-listing-8", component: PageAddListing8 },
  { path: "/add-listing-9", component: PageAddListing9 },
  { path: "/add-listing-10", component: PageAddListing10 },
  //
  { path: "/contact", component: PageContact },
  { path: "/about", component: PageAbout },
  { path: "/signup", component: PageSignUp },
  { path: "/login", component: PageLogin },

  { path: "/subscription", component: PageSubcription },
  //
  { path: "/logout", component: BttnLogout }
];

const securePaths = [
  "/checkout",
  "/pay-done",
  //
  "/account",
  "/account-savelists",
  "/account-password",
  "/account-billing",

  //
  "/add-listing-1",
  "/add-listing-2",
  "/add-listing-3",
  "/add-listing-4",
  "/add-listing-5",
  "/add-listing-6",
  "/add-listing-7",
  "/add-listing-8",
  "/add-listing-9",
  "/add-listing-10",
  //
  "/author",];




const MyRoutes = () => {
  
  const auth = useAuth();
   let isLogged = auth?.user != null;
  //
  let WIN_WIDTH = useWindowSize().width;
  if (typeof window !== "undefined") {
    WIN_WIDTH = WIN_WIDTH || window.innerWidth;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header/>

      <Routes>
        {pages.map(({ component, path }) => {
          const Component = component;
          if(securePaths.includes(path) && !isLogged){
             return <Route key={path}  element={<Navigate to ="/login"/>}/>;
      
          }
          return <Route key={path} element={<Component />} path={path} />;
    
        })}
        <Route element={<Page404 />} />
      </Routes>

      {WIN_WIDTH < 768 && <FooterNav />}
      <Footer />  
    </BrowserRouter>
  );
};

export default MyRoutes;
