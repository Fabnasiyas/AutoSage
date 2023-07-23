import React, { useState } from 'react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Do something with the searchQuery, e.g., send it to the server for processing
    console.log('Search query:', searchQuery);
  };

  return (
    <div className="flex items-center justify-center mt-5">
      <input
        type="text"
        placeholder="Search using Location"
        value={searchQuery}
        onChange={handleInputChange}
        className="h-12 px-4 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none w-96"
      />
    </div>
  );
};

export default Search;
