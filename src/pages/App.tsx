import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import Layout from "@components/Layout";
import Main from "@pages/Main";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { init } from "@store/slices/items";
import { appDispatch } from "@store/index";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Main />} />
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Route>
  )
);

function App() {
  const dispatch = useDispatch<appDispatch>();
  useEffect(() => {
    const timeoutId = setTimeout(() => dispatch(init()))
    return () => clearTimeout(timeoutId)
  }, [dispatch]);
  return <RouterProvider router={router} />;
}

export default App;
