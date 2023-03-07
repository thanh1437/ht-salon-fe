import React, { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContextProvider } from "./app/context/ToastContextProvider";
import { useNavigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./app/routes";
import { ProtectedRoute } from "./app/routes/ProtectedRoute";

export default function App() {
  const navigate = useNavigate();
  return (
    <ToastContextProvider>
      <Routes>
        {/* <LocaleProvider locale={enUS}> */}
        {publicRoutes.map((route, index) => {
          const Layout = route.layout === null ? Fragment : route.layout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page history={navigate} />
                </Layout>
              }
            />
          );
        })}
        {privateRoutes.map((route, index) => {
          const Layout = route.layout === null ? Fragment : route.layout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute>
                  <Layout>
                    <Page history={navigate} />
                  </Layout>
                </ProtectedRoute>
              }
            />
          );
        })}
        {/* </LocaleProvider> */}
      </Routes>
    </ToastContextProvider>
  );
}
