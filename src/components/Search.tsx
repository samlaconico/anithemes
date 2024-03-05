import { useState, KeyboardEvent, useEffect } from "react";
import ReactPlayer from "react-player";

function insertSpaceBeforeCapitalLetters(title:string) : string  {
  let result = ''
  
  for (let i = 0; i < title.length; i++) {
      if (title[i] === ' ') {
          result += ' '
          result += title.substring(i + 1)
          break
      }
      if (title[i] === title[i].toUpperCase() && i !== 0 && isNaN(Number(title[i]))) {
          result += ' '
      }
      result += title[i]
  }

  return result
}

export function Search() {
  const [search, setSearch] = useState<string>("");
  const [searchSuggestions, setSearchSuggestions] = useState<Array<{title:string, link:string}>>([]);
  const [video, setVideo] = useState("");
  const [currentSelection, setCurrentSelection] = useState<number>(0);

  useEffect(() => {
    if (!search) return setSearchSuggestions([])
    setSearchSuggestions([{title: "loading", link: "loading"}])

    const fetchData = async () => {
      const temp = await fetch(
        `https://api.animethemes.moe/search?q=${search}`
      ).then((res) => res.json());

      setSearchSuggestions([])
      temp.search.videos.map((index: any) => {
        setSearchSuggestions((searchSuggestions) => [
          ...searchSuggestions,
          {
            title: insertSpaceBeforeCapitalLetters(
              index.filename.split("-").join(" ")
            ),
            link: index.link,
          },
        ])
      })
    }

    const timer = setTimeout(() => {
      fetchData()
    }, 300)

    return () => clearTimeout(timer)

  }, [search])

  useEffect(() => {
    console.log(currentSelection)
  }, [currentSelection])

  const handleEnter = (e: KeyboardEvent) => {
    if (e.code == "Enter") {
      e.preventDefault();

      if (searchSuggestions[0].title != "loading")
        getAnime(searchSuggestions[currentSelection].title, searchSuggestions[currentSelection].link);
    }

    if (e.code == "ArrowDown" && currentSelection < searchSuggestions.length - 1) {
      setCurrentSelection(currentSelection => currentSelection + 1)
    } else if (e.code == "ArrowDown") {
      setCurrentSelection(0)
    } 

    if (e.code == "ArrowUp" && currentSelection > 0) {
      setCurrentSelection(currentSelection => currentSelection - 1)
    } else if (e.code == "ArrowUp") {
      setCurrentSelection(searchSuggestions.length - 1)
    }
  }

  const getAnime = async (search:string, link:string) => {
    setVideo(link)
    setSearchSuggestions([])
    setSearch("")
    console.log(search + ' ' + link)
  }

  return (
    <div className="flex flex-col shadow-xl rounded-md">
      <div className={video ? "visible" : "hidden"}>
        <ReactPlayer 
          url={video} 
          controls
          playing
          loop
        >
        </ReactPlayer>
      </div>
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
              className={
                searchSuggestions.findIndex(x => x.title === index.title) == currentSelection ?
                "bg-neutral-300 p-2 rounded-md" : 
                "p-2 rounded-md"
              }
              onClick={() => getAnime(index.title, index.link)}
              onMouseOver={() => setCurrentSelection(searchSuggestions.findIndex(x => x.title === index.title))}
              key={index.title}
            >
              {index.title}
            </h1>
          ))}
        </div>
      </form>
    </div>
  );
}

export default Search;
