import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import HeaderLayout from "./components/common/Layout";
import WritePost from "./pages/WritePost";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import LoginGuard from "./components/common/LoginGuard"; 

const ProtectedWritePost = LoginGuard(WritePost);
const ProtectedPostDetail = LoginGuard(PostDetail);

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
        element: <ProtectedPostDetail />,
      },
      {
        path: "write",
        element: <ProtectedWritePost />,
      },
      {
        path: "login",
        element: <Login />
      }
    ],
  },
]);

export default router;
