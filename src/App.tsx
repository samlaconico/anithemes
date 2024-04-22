import { useState } from "react";
import Search from "./components/Search";
import VideoPlayer from "./components/VideoPlayer";
import { useSearchParams } from "react-router-dom";


function App() {
  const [currentVideoURL, setCurrentVideoUrl] = useSearchParams();
  const [currentVideo, setCurrentVideo] = useState<string | null>(currentVideoURL.get("video"));

  const setVideo = (link:string) => {
    setCurrentVideo(link);
    setCurrentVideoUrl({video : link});
  }

  return (
    <>
      <div className="h-screen flex flex-col space-y-3 m-auto items-center justify-center">
        <div className="text-5xl text-center text-pink-100 drop-shadow-glow">anithemes</div>
        <VideoPlayer link={currentVideo}></VideoPlayer>
        <Search callback={setVideo}/>
      </div>      
    </>
  );
}

export default App;
