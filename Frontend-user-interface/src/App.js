import './App.css';
import {
    Routes,
    Route,
    Link
} from "react-router-dom";
import MapList from "./pages/MapList";
import Home from "./pages/Home";
import Nav from "./pages/Nav"
import Login from "./pages/Login";
// import Register from "./pages/Register";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Nav/>}>
                <Route index element={<Home/>}/>
                <Route path="/maplist" element={<MapList/>}/>
                <Route path="/login" element={<Login/>}/>
                {/*<Route path="/register" element={<Register/>}/>*/}
            </Route>
        </Routes>

    );
}


export default App;
