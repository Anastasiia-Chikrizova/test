export interface Store {
  type: string;
  id: string;
  attributes: {
    name: string;
    website: string;
    rating: number;
    storeImage: string;
    establishmentDate: string;
  };
  relationships?: {
    countries?: {
      data: {
        id: string;
        type: string;
        attributes?: {
          code: string;
        };
      };
    };
    books?: {
      data: Book[];
    };
  };
}

export interface Book {
  type: string;
  id: string;
  attributes: {
    name: string;
    copiesSold: number;
  };
  author: {
    fullName: string;
  };
  relationships: {
    author: {
      data: {
        id: string;
        type: string;
      };
    };
  };
}

export interface Author {
  type: string;
  id: string;
  attributes: {
    fullName: string;
  };
}

export interface Country {
  type: string;
  id: string;
  attributes: {
    code: string;
  };
}
