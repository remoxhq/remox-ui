import Layout from "@components/general/layout";
import About from "@pages/about/about";
import Dashboard from "@pages/dashboard/dashboard";
import Explore from "@pages/explore/explore";
import Favorites from "@pages/favorites/favorites";
import MyCreations from "@pages/my-creations/myCreations";
import { Navigate, createBrowserRouter } from "react-router-dom";

export const routes  = createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {index:true,element:<Explore/>},
            {path:"about",element:<About/>},
            {path:"favorites",element:<Favorites/>},
            {path:"my-creations",element:<MyCreations/>},
            {path:"community/:slug",element:<Dashboard/>},
            {path:"*",element:<Navigate to={'/'} replace/>}
        ]
    }
])