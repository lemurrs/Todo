import {combineReducers, createStore} from 'redux'
import projectPageReducer from "./ProjectPage-reducer"



let reducers = combineReducers({
    ProjectPage: projectPageReducer,
})

const store = createStore(reducers)
export default store
