import React, {createContext, FC, ReactNode, useContext, useState} from 'react';


export interface ISearchContextInterface {
  searchQuery: string,
  updateSearch: (query: string) => void
}

interface SearchProps { 
  children: ReactNode
}

const SearchContext = createContext<ISearchContextInterface | null>(null);

const SearchProvider: FC<SearchProps> = ({children}) => {
  const [searchQuery, setSearch] = useState<string>("");

  const updateSearch = (newQuery: string) => {
    setSearch(newQuery);
  };

  return (
    <SearchContext.Provider value={{searchQuery, updateSearch}}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => useContext(SearchContext) as ISearchContextInterface;

export default SearchProvider;