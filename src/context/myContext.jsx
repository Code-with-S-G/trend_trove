import { createContext } from "react";

// Define default values (optional)
const myContext = createContext({
  loading: false,
  getAllProduct:[],
  setLoading: () => {},
  showLogIn: false,
  setShowLogIn: () => {},
});

export default myContext;
