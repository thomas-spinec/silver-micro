function Search({ setSearch }) {
  return (
    <div className="flex h-full justify-center items-center gap-4 ">
      <input
        className="h-full"
        type="text"
        placeholder="Search"
        onChange={(e) => setSearch({ name: e.target.value })}
      />
    </div>
  );
}

export default Search;
