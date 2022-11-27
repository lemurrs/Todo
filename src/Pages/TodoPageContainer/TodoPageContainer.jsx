import React, {useState} from "react";
import TodoPage from "./TodoPage/TodoPage";
import {connect} from "react-redux";
import {
    addCommentCreator,
    AddExtraTask,
    ChangeStatus,
    ChangeTodo,
    SetTodoCreator
} from "../../redux/ProjectPage-reducer";


const TodoPageContainer = ({SetTodoCreator, ProjectData, ChangeStatus,ChangeTodo,AddExtraTask,addCommentCreator}) => {
    return (<TodoPage SetTodoCreator={SetTodoCreator} ProjectData={ProjectData} ChangeStatus={ChangeStatus} ChangeTodo={ChangeTodo} AddExtraTask={AddExtraTask} addCommentCreator={addCommentCreator}/>)
}
let mapStateToProps = (state) => ({
    ProjectData: state.ProjectPage.ProjectData
})

export default React.memo(connect(mapStateToProps, {SetTodoCreator, ChangeStatus,ChangeTodo,AddExtraTask,addCommentCreator})(TodoPageContainer))

