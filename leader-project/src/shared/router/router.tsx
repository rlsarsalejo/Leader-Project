import { createBrowserRouter } from "react-router-dom";
import LeaderComponent from "../components/LeaderComponent";
import Homepage from "../Pages/main"
import FetchData from "../Pages/FetchData";
const router = createBrowserRouter([
    // links for navbars
    {
        path: '/',
        element: <LeaderComponent />,
        children:[
            {
                path: '/',
                element: <Homepage />
            },
            {
                path: '/fetchdata',
                element: <FetchData />
            }
        ]
    }
])
export default router;