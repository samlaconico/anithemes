import { useState } from "react";
import Search from "./components/Search";

function test(name:string) {
  console.log("CALLBACK WORKING " + name)
}

function App() {
  return (
    <>
      <div className="h-screen flex flex-col space-y-3 m-auto items-center justify-center">
        <div className="text-5xl text-center">anithemes</div>
        <Search callbackFunction={test}/>
      </div>      
    </>
  );
}

export default App;
