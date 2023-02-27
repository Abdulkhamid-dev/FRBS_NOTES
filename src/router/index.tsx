import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const SignIn = lazy(() => import("../pages/Auth/SignIn"))
const SignUp = lazy(() => import("../pages/Auth/SignUp"))
const Todos = lazy(() => import("../pages/Main/Todos"))
const Users = lazy(() => import("../pages/Main/Users"))

interface IProtectorP {
  allowedRoles: string[];
  children: JSX.Element,
  role: string
}
const AuthRouter = [
  {
    path: "/sign-in",
    element: SignIn,
  },
  {
    path: "/sign-up",
    element: SignUp,
  },
];
const MainRouter = [
  {
    path: "/",
    roles: ["user", "admin"],
    element: Todos,
  },
  {
    path: "/users",
    roles: ["admin"],
    element: Users,
  },
];

const ProtectedRoute = (props: IProtectorP) => {
  const {
    allowedRoles,
    children,
    role
  } = props
  if (allowedRoles.indexOf(role) < 0) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export { AuthRouter, MainRouter, ProtectedRoute }