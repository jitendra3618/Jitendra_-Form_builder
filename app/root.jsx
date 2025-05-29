import "./styles/tailwind.css";


import React, { useEffect } from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./redux/store";
import { toggleTheme } from "./redux/formSlice";

function AppContent() {
  const theme = useSelector((state) => state.form.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme !== theme) dispatch(toggleTheme());
  }, []);

  return (
    <>
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </>
  );
}


export default function App() {
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>Form Builder</title>
        </head>
        <body className="bg-gray-100 min-h-screen text-gray-900">
          <Outlet />
        </body>
      </html>
    </Provider>
  );
}
