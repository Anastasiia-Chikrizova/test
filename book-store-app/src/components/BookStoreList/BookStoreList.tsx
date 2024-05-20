import { useEffect, useState } from "react";

import StoreDetails from "../StoreDetails/StoreDetails";
import useMediaQuery from "../../hooks/useMediaQuery";
import { mergeDataAndIncluded } from "../../helpers/mergeDataAndIncluded";

import { Store } from "../../types/types";
import cls from "./BookStoreList.module.css";

const BookStoreList = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isTablet = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch("http://localhost:3000/stores");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStores(mergeDataAndIncluded(data));
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul
      className={`${cls.bookStoreList} ${isTablet && cls.bookStoreListTablet}`}
    >
      {stores.map((store) => (
        <StoreDetails key={store.id} store={store} />
      ))}
    </ul>
  );
};

export default BookStoreList;
