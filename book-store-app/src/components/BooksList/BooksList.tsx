import { FC } from "react";

import { Book } from "../../types/types";
import cls from "./booksList.module.css";

interface BooksListProps {
  books: Book[];
}

const BooksList: FC<BooksListProps> = ({ books }) => {
  const sortedBooks = books
    .sort((a, b) => b.attributes.copiesSold - a.attributes.copiesSold)
    .slice(0, 2);

  return (
    <div>
      <p className={cls.subTitle}>Best-selling books</p>
      <ul className={cls.booksList}>
        {sortedBooks.map((book) => {
          return (
            <li key={book.id} className={`${cls.book} `}>
              <p>{book.attributes.name}</p>
              <p>{book.author.fullName}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BooksList;
