import { useState } from "react";
import Search from "./components/Search";

function App() {
  return (
    <>
      <div className="h-screen flex flex-col space-y-3 m-auto items-center justify-center">
        <div className="text-5xl text-center">anithemes</div>
        <Search/>
      </div>      
    </>
  );
}

export default App;
