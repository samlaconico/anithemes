import { useState } from 'react'

function App() {

  const [search, setSearch] = useState<any[]>([]);

  const submit = async (input:string) => {
    const temp = await fetch(
      `https://api.animethemes.moe/search?q=${input}`
    ).then((res) => res.json())
    
    setSearch([])
    
    temp.search.anime.map((index:any) => {
        setSearch(search => [...search, index.name])
        console.log("this is whats being added:" + index.name)
      }
    )

    console.log(search)
    //setSearch(temp)
  }

  return (
    <>
      <div className='h-screen flex flex-col space-y-3 m-auto items-center justify-center'>
        <div className='text-5xl text-center'>
          anithemes
        </div>
        <div className='flex flex-col items-center'>
          <form className='flex flex-col space-y-3'>
            <input
              className='bg-slate-400 rounded-md text-black px-1 border-black border-2 placeholder-white' 
              type="text"
              onChange={(e) => submit(e.target.value)}
              placeholder='title of Anime'
              id="theme" 
              name="theme"
            />
            <h1>{search.map((index) => (<p>{index}</p>))}</h1>

            <input 
              type="submit" 
              value="submit"
              className='rounded-md bg-neutral-400 w-1/2 self-center drop-shadow-md hover:bg-neutral-500 '
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default App
