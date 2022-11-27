import {combineReducers, createStore} from 'redux'
import projectPageReducer from "./ProjectPage-reducer"



let reducers = combineReducers({
    ProjectPage: projectPageReducer,
})

const persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {}

const store = createStore(reducers,persistedState)
store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})
export default store
