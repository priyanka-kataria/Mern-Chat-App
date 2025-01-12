import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ChatProvider from "./context/ChatProvider";
import SideDrawer from "./components/SideDrawer";

function App() {
  return (
    <div className="App">
      <ChatProvider>
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/chat" Component={SideDrawer}></Route>
        </Routes>
      </ChatProvider>
    </div>
  );
}

export default App;
