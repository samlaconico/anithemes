import { useState } from "react";
import Search from "./components/Search";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  const [currentVideo, setCurrentVideo] = useState("")

  const setVideo = (link:string) => {
    setCurrentVideo(link)
  }

  return (
    <>
      <div className="h-screen flex flex-col space-y-3 m-auto items-center justify-center">
        <div className="text-5xl text-center">anithemes</div>
        <VideoPlayer link={currentVideo}></VideoPlayer>
        <Search callback={setVideo}/>
      </div>      
    </>
  );
}

export default App;
