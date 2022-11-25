import React, {useState} from "react";
import TodoPage from "./TodoPage/TodoPage";
import {connect} from "react-redux";
import {ChangeStatusCreator, TodoCreator} from "../../redux/TodoPage-reducer";


const TodoPageContainer=({Todo,TodoCreator,ChangeStatusCreator})=>{

    console.log(Todo)




    return (<TodoPage Todo={Todo} TodoCreator={TodoCreator} ChangeStatusCreator={ChangeStatusCreator} />)
}
let mapStateToProps = (state) => ({
    Todo: state.TodoPage.Todo
})

export default connect(mapStateToProps, {TodoCreator,ChangeStatusCreator})(TodoPageContainer)

