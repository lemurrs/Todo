import React, {Suspense, lazy} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Header from "./Components/Header/Header";

const TodoPageContainer = lazy(() => import('./Pages/TodoPageContainer/TodoPageContainer'))
const ProjectPageContainer = lazy(() => import('./Pages/ProjectPageContainer/ProjectPageContainer'))

function App() {
    return (
        <div>
            <Header/>
            <Suspense fallback={<h2 style={{textAlign: 'center'}}>Loading data...</h2>}>
                <Routes>
                    <Route path={'/'} element={<ProjectPageContainer/>}></Route>
                    <Route path={'/:todoTitle'} element={<TodoPageContainer/>}></Route>
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
