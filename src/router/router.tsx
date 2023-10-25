import {Provider} from "react-redux";
import {createBrowserRouter} from "react-router-dom";
import {AboutPage, DetailPage, ErrorPage, HomePage, Login, NewTodoPage, Register} from "../pages";
import store from "../redux/store";
import {App} from "../App";

export const routerConfig = createBrowserRouter([
    {
        path: "/",
        element: <Provider store={store}><App/> </Provider>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <HomePage/>,
            },
            {
                path: "/new-campaign",
                element: <NewTodoPage/>,
            },
            {
                path: "/about/:id",
                element: <AboutPage/>,
            },
            {
                path: "/detail",
                element: <DetailPage/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/register",
                element: <Register/>,
            },

        ],
    },
]);