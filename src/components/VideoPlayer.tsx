import ReactPlayer from "react-player";

type VideoPlayerParams = {
  link: string;
};

export function VideoPlayer({ link }: VideoPlayerParams) {
  return (
    <>
      <div className={link ? "visible" : "hidden"}>
        <ReactPlayer
          height={"563px"}
          width={"1000px"}
          url={link}
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
