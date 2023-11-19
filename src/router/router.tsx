import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { createBrowserRouter } from "react-router-dom";
import store from "../redux/store";
import { App } from "../App";
import { Layout, LayoutAdmin, LayoutFooter, Loading, LoadingApp } from "../componets";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import RouteLogin from "./ProtectedRoute/RouteLogin";
import ProtectedRouteAdmin from "./ProtectedRoute/ProtectedRouteAdmin";


const HomePage = lazy(() => import('../pages/Home'));
const AboutPage = lazy(() => import('../pages/About'));
const DetailPage = lazy(() => import("../pages/Detail"))
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"))
const Login = lazy(() => import("../pages/Login"))
const AdminPage = lazy(() => import("../pages/Admin"))
const NewTodoPage = lazy(() => import("../pages/NewTodo"))
const Redirect = lazy(() => import("../pages/Redirect"))
const Register = lazy(() => import("../pages/Register"))
const ResetPassword = lazy(() => import("../pages/ResetPassword"))
const TemplatePage = lazy(() => import("../pages/TemplatePage"))
const ErrorPage = lazy(() => import("../pages/Error"))



export const routerConfig = createBrowserRouter([
    {
        path: "/",
        element:
            <Provider store={store}>
                <Suspense fallback={<LoadingApp />}>
                    <App />
                </Suspense>
            </Provider>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element:
                    <ProtectedRoute>
                        <Layout>
                            <HomePage />
                        </Layout>
                    </ProtectedRoute>,
            },
            {
                path: "/new-campaign",
                element:
                    <ProtectedRoute>
                        <Layout>
                            <NewTodoPage />
                        </Layout>
                    </ProtectedRoute>,
            },
            {
                path: "/about/:planId/:taskId",
                element:
                    <ProtectedRoute>
                        <Layout>
                            <AboutPage />
                        </Layout>
                    </ProtectedRoute >,
            },
            {
                path: "/details/:planId",
                element:
                    <ProtectedRoute>
                        <Layout>
                            <DetailPage />
                        </Layout>
                    </ProtectedRoute>,
            },
            {
                path: "/login",
                element:
                    <RouteLogin>
                        <LayoutFooter>
                            <Login />
                        </LayoutFooter>
                    </RouteLogin>

            },
            {
                path: "/register",
                element:
                    <RouteLogin>
                        <LayoutFooter>
                            <Register />
                        </LayoutFooter>
                    </RouteLogin>,
            },
            {
                path: "/forgot",
                element:
                    <RouteLogin>
                        <LayoutFooter>
                            <ForgotPassword />
                        </LayoutFooter>
                    </RouteLogin>,
            },
            {
                path: "/forgot_password/:token",
                element:
                    <RouteLogin>
                        <LayoutFooter>
                            <ResetPassword />
                        </LayoutFooter>
                    </RouteLogin>,
            },

            {
                path: "/redirect/:token",
                element:
                    <RouteLogin>
                        <Redirect />
                    </RouteLogin>,
            },
            {
                path: "/admin",
                element:
                    <ProtectedRouteAdmin>
                        <LayoutAdmin>
                            <AdminPage />
                        </LayoutAdmin>
                    </ProtectedRouteAdmin>,
            },
            {
                path: "/admin/template/:templateId",
                element:
                    <ProtectedRouteAdmin>
                        <LayoutAdmin>
                            <TemplatePage />
                        </LayoutAdmin>
                    </ProtectedRouteAdmin>,
            },

            {
                path: "/admin/task/:taskId",
                element:
                    <ProtectedRouteAdmin>
                        <LayoutAdmin>
                            <TemplatePage />
                        </LayoutAdmin>
                    </ProtectedRouteAdmin>,
            },
        ],
    },
]);