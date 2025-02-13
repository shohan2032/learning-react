interface SearchBarProps {
  searchText: string,
  onChangeSearchText: (searchText: string) => void,  
}
const SearchBar:React.FC<SearchBarProps> =  ({ searchText, onChangeSearchText }) => {
  return (
    <form className="bg-white/80 backdrop-blur-md shadow-lg rounded-full px-6 py-3 w-full max-w-lg">
      <div className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="🔍 Search for blogs..."
          value={searchText}
          onChange={(e) => onChangeSearchText(e.target.value)}
          className="w-full bg-transparent border-none focus:outline-none text-gray-700 text-lg placeholder-gray-500"
        />
      </div>
    </form>
  );
}

export default SearchBar;
