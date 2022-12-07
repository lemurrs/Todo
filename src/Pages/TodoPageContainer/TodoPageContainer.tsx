import React from "react";
import TodoPage from "./TodoPage/TodoPage";
import {connect} from "react-redux";
import {
    addCommentCreator,
    AddExtraTask,
    ChangeStatus,
    ChangeTodo, DeleteTodo, SetExtraAsDoneCreator,
    SetTodoCreator
} from "../../redux/ProjectPage-reducer";
import {AppStateType} from "../../redux/redux-store";
import {TodoPageProps} from "../../Types";



const TodoPageContainer:React.FC<TodoPageProps> = ({SetTodoCreator, ProjectData, ChangeStatus,ChangeTodo,AddExtraTask,addCommentCreator,SetExtraAsDoneCreator,DeleteTodo}) => {
    return (<TodoPage SetTodoCreator={SetTodoCreator} ProjectData={ProjectData} ChangeStatus={ChangeStatus} ChangeTodo={ChangeTodo} AddExtraTask={AddExtraTask} addCommentCreator={addCommentCreator} SetExtraAsDoneCreator={SetExtraAsDoneCreator} DeleteTodo={DeleteTodo}/>)
}
let mapStateToProps = (state:AppStateType) => ({
    ProjectData: state.ProjectPage.ProjectData
})

export default React.memo(connect(mapStateToProps, {SetTodoCreator, ChangeStatus,ChangeTodo,AddExtraTask,addCommentCreator,SetExtraAsDoneCreator,DeleteTodo})(TodoPageContainer))

