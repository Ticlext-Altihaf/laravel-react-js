import './App.css';

import { Route, Routes } from 'react-router-dom'
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
    )
}

export default App;
