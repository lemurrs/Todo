import {combineReducers, createStore} from 'redux'
import projectPageReducer from "./ProjectPage-reducer"


let RootReducer = combineReducers({
    ProjectPage: projectPageReducer,
})
type RootReducerType = typeof RootReducer
export type AppStateType = ReturnType<RootReducerType>

const persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState') || '')
    : {}

const store = createStore(RootReducer, persistedState)
store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})
export default store
