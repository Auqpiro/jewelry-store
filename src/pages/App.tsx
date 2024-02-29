import Layout from "@components/Layout";
import Main from "@components/Main";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Main />} />
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;