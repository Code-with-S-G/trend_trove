import { useEffect, useState } from "react";
import MyContext from "./myContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";

const categoryList = [{ name: "Mens wear" }, { name: "Womens wear" }, { name: "Kids wear" }, { name: "Laptops" }, { name: "Mobiles" }, { name: "Home Appliences" }, { name: "Sofas" }, { name: "Dinning Tables" }, { name: "Beds" }];

function MyState({ children }) {
  const [loading, setLoading] = useState(false);
  const [getAllProduct, setGetAllProduct] = useState([]);

  const getAllProductFunction = async () => {
    setLoading(true);
    try {
      const unsubscribers = [];
      let allProducts = [];

      categoryList.forEach((item) => {
        const q = query(collection(fireDB, item.name), orderBy("time"));
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          const categoryProducts = QuerySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            category: item.name,
          }));

          // Update products for this category in the allProducts array
          allProducts = allProducts.filter((p) => p.category !== item.name);
          allProducts = [...allProducts, ...categoryProducts];

          // Update state with all products
          setGetAllProduct(allProducts);
        });

        unsubscribers.push(unsubscribe);
      });

      setLoading(false);

      // Cleanup function
      return () => {
        unsubscribers.forEach((unsubscribe) => unsubscribe());
      };
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  console.log(getAllProduct);
  

  useEffect(() => {
    const unsubscribe = getAllProductFunction();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        getAllProduct,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyState;
