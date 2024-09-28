import { useState } from "react";
import Sidebar from "./layout/Sidebar";
import Tasks from "./pages/Tasks";

function App() {
  const [open,setOpen]=useState<boolean>(false)
  return (
    <>
    <Sidebar open={open} />
    <Tasks setOpen={setOpen} />
    </>
  );
}

export default App;
