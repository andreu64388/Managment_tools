import {Provider} from "react-redux";
import {createBrowserRouter} from "react-router-dom";
import {AboutPage, DetailPage, ErrorPage, ForgotPassword, HomePage, Login, NewTodoPage, Register} from "../pages";
import store from "../redux/store";
import {App} from "../App";
import {LayoutFooter,Layout} from "../componets";

export const routerConfig = createBrowserRouter([
    {
        path: "/",
        element: <Provider store={store}><App/> </Provider>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element:
                    <Layout>
                    <HomePage/>
                    </Layout>,
            },
            {
                path: "/new-campaign",
                element:
                    <Layout>
                    <NewTodoPage/>
                    </Layout>,
            },
            {
                path: "/about/:id",
                element:
                    <Layout>
                    <AboutPage/>
                    </Layout>,
            },
            {
                path: "/detail",
                element:
                    <Layout>
                    <DetailPage/>
                    </Layout>,
            },
            {
                path: "/login",
                element:
                    <LayoutFooter>
                    <Login/>
                    </LayoutFooter>,
            },
            {
                path: "/register",
                element:
                    <LayoutFooter>
                    <Register/>
                    </LayoutFooter>,
            },
            {
                path: "/forgot",
                element:
                    <LayoutFooter>
                        <ForgotPassword/>
                    </LayoutFooter>,
            },

        ],
    },
]);