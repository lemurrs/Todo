import React, {useState} from "react";
import TodoPage from "./TodoPage/TodoPage";
import {connect} from "react-redux";
import {ChangeStatus, ChangeTodo, SetTodoCreator} from "../../redux/ProjectPage-reducer";


const TodoPageContainer = ({SetTodoCreator, ProjectData, ChangeStatus,ChangeTodo}) => {
    return (<TodoPage SetTodoCreator={SetTodoCreator} ProjectData={ProjectData} ChangeStatus={ChangeStatus} ChangeTodo={ChangeTodo}/>)
}
let mapStateToProps = (state) => ({
    ProjectData: state.ProjectPage.ProjectData
})

export default connect(mapStateToProps, {SetTodoCreator, ChangeStatus,ChangeTodo})(TodoPageContainer)

