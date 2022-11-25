import React, {useState} from "react";
import TodoPage from "./TodoPage/TodoPage";
import {connect} from "react-redux";
import {ChangeStatus, SetTodoCreator} from "../../redux/ProjectPage-reducer";


const TodoPageContainer = ({SetTodoCreator, ProjectData, ChangeStatus}) => {
    return (<TodoPage SetTodoCreator={SetTodoCreator} ProjectData={ProjectData} ChangeStatus={ChangeStatus}/>)
}
let mapStateToProps = (state) => ({
    ProjectData: state.ProjectPage.ProjectData
})

export default connect(mapStateToProps, {SetTodoCreator, ChangeStatus})(TodoPageContainer)

