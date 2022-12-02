import './index.css'

import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {EmployeeContext} from "./contexte/store"
import EmployeeList from "./pages/employee-list/employee-list.jsx";
import Home from "./pages/home/home";
import Error from "./pages/error/error.jsx";
import Layout from "./components/layout/layout.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/employee-list",
                element: <EmployeeList />,
            },
            {
                path: "/404",
                element: <Error />,
            },
            {
                path: "/*",
                element: <Error />,
            }
        ]
    }
]);

const App = () => {
    const [employees, setEmployees] = useState([
        {
            id: 0,
            firstName: "Jean",
            lastName: "B",
            startDate: new Date(),
            department: "department",
            dateOfBirth: new Date(),
            street: "street",
            city: "city",
            state: "state",
            zipCode: "2"
        },
        {
            id: 1,
            firstName: "Jack",
            lastName: "A",
            startDate: new Date(),
            department: "department2",
            dateOfBirth: new Date(),
            street: "street2",
            city: "city2",
            state: "state2",
            zipCode: "3"
        },
        {
            id: 632,
            firstName: "Jeanne",
            lastName: "C",
            startDate: new Date(),
            department: "department2",
            dateOfBirth: new Date(),
            street: "street2",
            city: "city2",
            state: "state2",
            zipCode: "4"
        },
        {
            id: 3,
            firstName: "Eric",
            lastName: "D",
            startDate: new Date(),
            department: "department2",
            dateOfBirth: new Date(),
            street: "street2",
            city: "city2",
            state: "state2",
            zipCode: "1"
        },
        {
            id: 4,
            firstName: "Erika",
            lastName: "F",
            startDate: new Date(),
            department: "department2",
            dateOfBirth: new Date(),
            street: "street2",
            city: "city2",
            state: "state2",
            zipCode: "1"
        },
        {
            id: 5,
            firstName: "Rémi",
            lastName: "E",
            startDate: new Date(),
            department: "department2",
            dateOfBirth: new Date(),
            street: "street2",
            city: "city2",
            state: "state2",
            zipCode: "1"
        }
    ])
    return (
        <React.StrictMode>
            <EmployeeContext.Provider value={{employees, setEmployees}}>
                <RouterProvider router={router} />
            </EmployeeContext.Provider>
        </React.StrictMode>
    )
}


ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
