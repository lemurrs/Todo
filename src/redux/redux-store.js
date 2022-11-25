import {combineReducers, createStore} from 'redux'
import todoPageReducer from './TodoPage-reducer'
import projectPageReducer from "./ProjectPage-reducer"

let reducers = combineReducers({
    ProjectPage: projectPageReducer,
    TodoPage: todoPageReducer,
})

const store = createStore(reducers)
export default store
