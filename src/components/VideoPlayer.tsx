import ReactPlayer from "react-player";

type VideoPlayerParams = {
  link: string | null ;
};

export function VideoPlayer({ link }: VideoPlayerParams) {
  return (
    <>
      <div className={link ? "visible" : "hidden"}>
        <ReactPlayer
          height={"563px"}
          width={"1000px"}
          url={link != null ? link : ""}
          controls
          playing
          loop
        >
            
        </ReactPlayer>
      </div>
    </>
  );
}

export default VideoPlayer;
