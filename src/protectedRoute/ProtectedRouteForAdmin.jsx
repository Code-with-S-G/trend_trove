/* eslint-disable react/prop-types */
import { Navigate } from "react-router"

export const ProtectedRouteForAdmin = ({children}) => {
    const user = JSON.parse(localStorage.getItem('users'))
    if (user?.role === "Admin") {
      return children
    }
    else {
      return <Navigate to={'/'}/>
    }
}