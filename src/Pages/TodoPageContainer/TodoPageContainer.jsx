import React, {useState} from "react";
import TodoPage from "./TodoPage/TodoPage";
import {connect} from "react-redux";
import {
    addCommentCreator,
    AddExtraTask,
    ChangeStatus,
    ChangeTodo, saveReply,
    SetTodoCreator
} from "../../redux/ProjectPage-reducer";


const TodoPageContainer = ({SetTodoCreator, ProjectData, ChangeStatus,ChangeTodo,AddExtraTask,addCommentCreator,saveReply}) => {
    return (<TodoPage SetTodoCreator={SetTodoCreator} ProjectData={ProjectData} ChangeStatus={ChangeStatus} ChangeTodo={ChangeTodo} AddExtraTask={AddExtraTask} addCommentCreator={addCommentCreator} saveReply={saveReply}/>)
}
let mapStateToProps = (state) => ({
    ProjectData: state.ProjectPage.ProjectData
})

export default connect(mapStateToProps, {SetTodoCreator, ChangeStatus,ChangeTodo,AddExtraTask,addCommentCreator,saveReply})(TodoPageContainer)

