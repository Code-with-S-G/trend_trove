/* eslint-disable react/prop-types */
import { Navigate } from "react-router"

export const ProtectedRouteForCart = ({children}) => {
    const user = JSON.parse(localStorage.getItem('users'))
    if (user) {
      return children
    }
    else {
      return <Navigate to={'/'}/>
    }
}