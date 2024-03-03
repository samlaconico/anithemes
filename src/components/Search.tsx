import { useState, KeyboardEvent, useEffect } from "react";

type SearchParams =  {
  callbackFunction:(name:string) => void
}

export function Search({callbackFunction}:SearchParams) {
  const [search, setSearch] = useState<string>();
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [image, setImage] = useState();

  useEffect(() => {
    if (!search) return setSearchSuggestions([])
    setSearchSuggestions(["loading"])

    const fetchData = async () => {
      console.log("MAKING AN API CALL")
      const temp = await fetch(
        `https://api.animethemes.moe/search?q=${search}`
      ).then((res) => res.json());

      console.log(temp)
      setSearchSuggestions([])
      temp.search.videos.map((index: any) => {
        //console.log(index.name)
        setSearchSuggestions((searchSuggestions) => [...searchSuggestions, index.filename.split('-').join(' ')])
      })
    }

    const timer = setTimeout(() => {
      fetchData()
    }, 300)

    return () => clearTimeout(timer)

  }, [search])

  /*
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

    
    callbackFunction(temp.search.anime[0].name);
    console.log(search);
    //setSearch(temp)
  };*/

  const handleEnter = (e: KeyboardEvent) => {
    if (e.code == "Enter") {
      e.preventDefault();

      if (search?.toLowerCase() == searchSuggestions[0].toLowerCase()) {
        getAnime(search.toLowerCase())
        setSearch("")
        setSearchSuggestions([])
      }
    }
  }; 

  const getAnime = async (search:string) => {
    console.log(search)
  }

  return (
    <div className="flex flex-col shadow-xl rounded-md">

      <form className="space-y-3 w-full">
        <input
          className="w-full bg-white rounded-md text-black p-2 placeholder-neutral-400"
          type="text"
          placeholder="title of Anime"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => handleEnter(e)}
          value={search}
          id="theme"
          name="theme"
        />

        <div
          className={
            searchSuggestions.length > 0
              ? " divide-y-2 divide-black/5 rounded-md"
              : "hidden"
          }
        >
          {searchSuggestions.map((index) => (
            <h1 
              className="hover:bg-neutral-300 p-2 rounded-md" 
              onClick={() => getAnime(index)} 
              key={index}
            >
              {index}
            </h1>
          ))}
        </div>
      </form>
    </div>
  );
}

export default Search;
