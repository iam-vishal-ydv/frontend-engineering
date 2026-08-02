import { useEffect, useState } from "react";
import Input from "./input";
import "./auto-complete.style.css";
import Listing from "./listing";
type Recipe = {
  id: number;
  name: string;
  image: string;
  rating: number;
};
type RecipesResponse = {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
};
function AutoComplete() {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<Recipe[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [cacheSearch, setCacheSearch] = useState<Record<string, Recipe[]>>({});
  const [selectedIndex, setSelectedIndex] = useState(-1);

  async function fetchProduct() {
    if (cacheSearch[search]) {
      setData(cacheSearch[search]);
      console.log("cacheSearch");
      return;
    }
    try {
      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${search}`,
      );
      let convert: RecipesResponse = await res.json();
      let data = convert?.recipes || [];
      setData(data);
      setCacheSearch((prev) => ({ ...prev, [search]: data }));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    let timerId = setTimeout(fetchProduct, 300);
    return () => clearTimeout(timerId);
  }, [search]);
  function onSelect(name: string) {
    setSearch(name);
  }
  function onSelectRemove() {
    setSearch("");
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        setSelectedIndex((prev) => (prev < data.length - 1 ? prev + 1 : prev));
        break;

      case "ArrowUp":
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;

      case "Enter":
        if (selectedIndex >= 0) {
          setSearch(data[selectedIndex].name);
          setShowResult(false);
        }
        break;

      case "Escape":
        setShowResult(false);
        break;

      default:
        break;
    }
  };

  return (
    <div className="auto-complete-container">
      <h1>AutoComplete Search</h1>
      <p>React + TypeScript | Debouncing | Caching | Keyboard Navigation</p>
      <div className="search-container">
        <Input
          search={search}
          setSearch={setSearch}
          onSelectRemove={onSelectRemove}
          onFocus={() => setShowResult(true)}
          onBlur={() => setShowResult(false)}
          placeholder="Search..."
          onKeyDown={handleKeyDown}
        />
      </div>
      {showResult && (
        <div className="listing-container">
          <Listing
            selectedIndex={selectedIndex}
            data={data}
            onSelect={onSelect}
          />
        </div>
      )}
    </div>
  );
}

export default AutoComplete;
