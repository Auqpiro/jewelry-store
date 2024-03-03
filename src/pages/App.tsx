import { useEffect } from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Layout from "@components/Layout";
import Main from "@pages/Main";
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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => dispatch(init(controller.signal)));
    return () => {
      clearTimeout(timeoutId);
      controller.abort()
    };
  }, [dispatch]);
  
  return <RouterProvider router={router} />;
}

export default App;
