import { useEffect, useState } from 'react';
import MyContext from './myContext';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';

const categoryList = [
  { name: 'Mens wear' },
  { name: 'Womens wear' },
  { name: 'Kids wear' },
  { name: 'Laptops' },
  { name: 'Mobiles' },
  { name: 'Home Appliences' },
  { name: 'Sofas' },
  { name: 'Dinning Tables' },
  { name: 'Beds' },
];

function MyState({ children }) {
  const [loading, setLoading] = useState(true);
  const [getAllProduct, setGetAllProduct] = useState([]);
  const [showLogIn, setShowLogIn] = useState(false);
  const [getAllOrder, setGetAllOrder] = useState([]);
  const [getAllUser, setGetAllUser] = useState([]);

  const getAllProductFunction = async () => {
    setLoading(true);

    try {
      const unsubscribers = [];
      let allProducts = [];

      categoryList.forEach((item, index) => {
        const q = query(collection(fireDB, item.name), orderBy('time', 'desc'));
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          const categoryProducts = QuerySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            category: item.name,
          }));

          // Update products for this category in the allProducts array
          allProducts = allProducts.filter((p) => p.category !== item.name);
          allProducts = [...allProducts, ...categoryProducts];

          // Sort all products by time before updating state
          const sortedProducts = allProducts.sort((a, b) => {
            return b.time - a.time; // Sort in descending order (newest first)
          });

          // Update state with all products
          setGetAllProduct(allProducts);
          // Set loading to false when all data is loaded
          if (index + 1 === categoryList.length) {
            setLoading(false);
          }
        });

        unsubscribers.push(unsubscribe);
      });

      // Cleanup function
      return () => {
        unsubscribers.forEach((unsubscribe) => unsubscribe());
      };
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getAllOrderFunction = async () => {
    setLoading(true);
    try {
        const q = query(
            collection(fireDB, "orders"),
            orderBy('time', 'desc')
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
            let orderArray = [];
            QuerySnapshot.docs.forEach((doc) => {
                orderArray.push({ ...doc.data(), id: doc.id });
            });
            setGetAllOrder(orderArray);
            setLoading(false);
        });
        // return () => data;
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
}

const getAllUserFunction = async () => {
  setLoading(true);
  try {
      const q = query(
          collection(fireDB, "users"),
          orderBy('time', 'desc')
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
          let userArray = [];
          QuerySnapshot.docs.forEach((doc) => {
              userArray.push({ ...doc.data(), id: doc.id });
          });
          setGetAllUser(userArray);
          setLoading(false);
      });
      // return () => data;
  } catch (error) {
      console.log(error);
      setLoading(false);
  }
}

  useEffect(() => {
    const unsubscribe = getAllProductFunction();
    getAllOrderFunction();
    getAllUserFunction();
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
        showLogIn,
        setShowLogIn,
        getAllOrder,
        getAllUser,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyState;
