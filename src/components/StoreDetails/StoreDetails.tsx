import { FC } from "react";

import CountryFlag from "../CountryFlag/CountryFlag";
import StarRating from "../StarRating/StarRating";
import useMediaQuery from "../../hooks/useMediaQuery";
import BooksList from "../BooksList/BooksList";
import { formatDate } from "../../helpers/formatDate";

import { Store } from "../../types/types";
import cls from "./storeDetails.module.css";

interface StoreDetailsProps {
  store: Store;
}

const StoreDetails: FC<StoreDetailsProps> = ({ store }) => {
  const isTablet = useMediaQuery("(min-width: 768px)");

  return (
    <li className={cls.storeDetails}>
      <div
        className={`${cls.storeContainer} ${
          isTablet && cls.storeContainerTablet
        }`}
      >
        <img
          className={cls.image}
          src={store.attributes.storeImage}
          alt={store.attributes.name}
          width='150'
          height='150'
        />
        <div className={cls.cardHeader}>
          <div className={cls.titleContainer}>
            <h2>{store.attributes.name}</h2>
            <StarRating rating={store.attributes.rating} />
          </div>
          {store?.relationships?.books?.data ? (
            <BooksList books={store.relationships.books.data} />
          ) : (
            <p className={cls.error}>No data available</p>
          )}
        </div>
      </div>

      <div className={`${cls.cardFooter} ${isTablet && cls.cardFooterTablet}`}>
        <p className={cls.link}>
          {formatDate(store.attributes.establishmentDate)} -{" "}
          <a
            href={store.attributes.website}
            target='_blank'
            rel='noopener noreferrer'
          >
            {store.attributes.website}
          </a>
        </p>

        <CountryFlag
          countryCode={store?.relationships?.countries?.data?.attributes?.code}
        />
      </div>
    </li>
  );
};

export default StoreDetails;
