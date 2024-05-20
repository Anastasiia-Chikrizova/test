import { Store } from "../types/types";

export const mergeDataAndIncluded = ({ data, included }) => {
  const includedMap = included.reduce((map, item) => {
    if (!map[item.type]) {
      map[item.type] = {};
    }
    map[item.type][item.id] = item;
    return map;
  }, {});

  const getRelatedData = (relationship: { id: string; type: string }) => {
    const { id, type } = relationship;
    return includedMap[type] ? includedMap[type][id] : null;
  };

  const merged = data.map((store: Store) => {
    const storeCopy = { ...store };

    if (storeCopy?.relationships?.books) {
      storeCopy.relationships.books.data =
        storeCopy.relationships.books.data.map((book) => {
          const bookData = getRelatedData(book);
          const authorId = bookData?.relationships?.author?.data?.id;
          const authorData = authorId
            ? getRelatedData({ id: authorId, type: "authors" })
            : null;
          return {
            ...bookData,
            author: authorData ? authorData.attributes : null,
          };
        });
    }

    if (storeCopy?.relationships?.countries) {
      storeCopy.relationships.countries.data = getRelatedData(
        storeCopy.relationships.countries.data
      );
    }

    return storeCopy;
  });
  return merged;
};
