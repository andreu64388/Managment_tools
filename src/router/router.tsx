import { Provider } from "react-redux";
import { createBrowserRouter } from "react-router-dom";
import { AboutPage, DetailPage, ErrorPage, ForgotPassword, HomePage, Login, NewTodoPage, Register, ResetPassword } from "../pages";
import store from "../redux/store";
import { App } from "../App";
import { Layout, LayoutFooter } from "../componets";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

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
                path: "/about/:id",
                element:
                    <ProtectedRoute>
                        <Layout>
                            <AboutPage />
                        </Layout>
                    </ProtectedRoute>,
            },
            {
                path: "/detail",
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
                    <LayoutFooter>
                        <Login />
                    </LayoutFooter>,
            },
            {
                path: "/register",
                element:
                    <LayoutFooter>
                        <Register />
                    </LayoutFooter>,
            },
            {
                path: "/forgot",
                element:
                    <LayoutFooter>
                        <ForgotPassword />
                    </LayoutFooter>,
            },
            {
                path: "/forgot_password/:token",
                element:
                    <LayoutFooter>
                        <ResetPassword />
                    </LayoutFooter>,
            },
        ],
    },
]);