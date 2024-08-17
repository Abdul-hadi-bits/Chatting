import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import "./style/App.css";
import appStore from "./app/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const LoginPage = React.lazy(() => import("./pages/login.tsx"));
const RegisterPage = React.lazy(() => import("./pages/register.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        {<LoginPage></LoginPage>}
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        {<RegisterPage></RegisterPage>}
      </Suspense>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={appStore}>
    <RouterProvider router={router} />
  </Provider>
);
