import { createBrowserRouter } from "react-router";
import RootLayOut from "../layouts/RootLayOut";
import Home from "../pages/home/Home";
import Features from "../pages/features/Features";
import Process from "../pages/process/Process";
import BlogPage from "../pages/blog/BlogPage";

export const router = createBrowserRouter([
    {
        path:'/',
        Component:RootLayOut,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path: 'features',
                element: <Features />
            },
            {
                path: 'process',
                element: <Process/>
            },
            {
                path: 'blog',
                element: <BlogPage/>
            },
        ]
    }
])