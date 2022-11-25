import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import TodoPageContainer from "./Pages/TodoPageContainer/TodoPageContainer";
import Header from "./Components/Header/Header";
import ProjectPageContainer from "./Pages/ProjectPageContainer/ProjectPageContainer";

function App() {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path={'/'} element={<ProjectPageContainer/>}></Route>
                <Route path={'/:todoTitle'} element={<TodoPageContainer/>}></Route>
            </Routes>
        </div>
    );
}

export default App;
