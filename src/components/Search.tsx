import { useState, KeyboardEvent } from "react";

export function Search() {
  const [search, setSearch] = useState<any[]>([]);

  const handleChange = async (input: string) => {
    setSearch(["loading"]);
    const temp = await fetch(
      `https://api.animethemes.moe/search?q=${input}`
    ).then((res) => res.json());

    setSearch([]);
    temp.search.anime.map((index: any) => {
      setSearch((search) => [...search, index.name]);
      console.log("this is whats being added:" + index.name);
    });

    console.log(search);
    //setSearch(temp)
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.code == "Enter") {
      e.preventDefault();
    }

    console.log(e.key);
  };

  return (
    <div className="flex flex-col shadow-xl rounded-md">
      <form className="space-y-3 w-full">
        <input
          className="w-full bg-white rounded-md text-black p-2 placeholder-neutral-400"
          type="text"
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => handleEnter(e)}
          placeholder="title of Anime"
          id="theme"
          name="theme"
        />

        <div
          className={
            search.length > 0
              ? " divide-y-2 divide-black/5 rounded-md"
              : "hidden"
          }
        >
          {search.map((index) => (
            <h1 className="hover:bg-neutral-300 p-2 rounded-md">{index}</h1>
          ))}
        </div>
      </form>
    </div>
  );
}

export default Search;
