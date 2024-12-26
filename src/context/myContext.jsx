import { createContext } from "react";

// Define default values (optional)
const myContext = createContext({
  loading: false,
  setLoading: () => {},
});

export default myContext;
