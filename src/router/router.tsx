import { Provider } from "react-redux";
import { createBrowserRouter } from "react-router-dom";
import { AboutPage, DetailPage, ErrorPage, ForgotPassword, HomePage, Login, NewTodoPage, Redirect, Register, ResetPassword, TemplatePage } from "../pages";
import store from "../redux/store";
import { App } from "../App";
import { Layout, LayoutAdmin, LayoutFooter } from "../componets";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { AdminPage } from "../pages/Admin";
import RouteLogin from "./ProtectedRoute/RouteLogin";
import ProtectedRouteAdmin from "./ProtectedRoute/ProtectedRouteAdmin";

export const routerConfig = createBrowserRouter([
    {
        path: "/",
        element: <Provider store={store}>
            <App />
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
                    </ProtectedRoute>,
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