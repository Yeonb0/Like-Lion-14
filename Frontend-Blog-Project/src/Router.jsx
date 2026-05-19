import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import HeaderLayout from "./components/common/Layout";
import WritePost from "./pages/WritePost";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "post/:postId",
        element: <PostDetail />,
      },
      {
        path: "write",
        element: <WritePost />,
      },
      {
        path: "login",
        element: <Login />
      }
    ],
  },
]);

export default router;
