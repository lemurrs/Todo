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
import {
    addCommentCreatorType,
    AddExtraTaskType,
    ChangeStatusType,
    ChangeTodoType, DeleteTodoType, SetExtraAsDoneCreatorType,
    SetTodoCreatorType,
    TodoPageProps
} from "../../Types";
import {Project} from "../../Interfaces";
import {ActionCreator} from "redux";


type MapStateToPropsType = {
    ProjectData: Project[]
}
type MapDispatchToPropsType = {
    SetTodoCreator: ActionCreator<SetTodoCreatorType>,
    ChangeStatus: ActionCreator<ChangeStatusType>,
    ChangeTodo: ActionCreator<ChangeTodoType>,
    AddExtraTask: ActionCreator<AddExtraTaskType>,
    addCommentCreator: ActionCreator<addCommentCreatorType>,
    SetExtraAsDoneCreator: ActionCreator<SetExtraAsDoneCreatorType>,
    DeleteTodo: ActionCreator<DeleteTodoType>
}
type OwnPropsType = {}

const TodoPageContainer: React.FC<TodoPageProps> = ({
                                                        SetTodoCreator,
                                                        ProjectData,
                                                        ChangeStatus,
                                                        ChangeTodo,
                                                        AddExtraTask,
                                                        addCommentCreator,
                                                        SetExtraAsDoneCreator,
                                                        DeleteTodo
                                                    }) => {
    return (<TodoPage SetTodoCreator={SetTodoCreator} ProjectData={ProjectData} ChangeStatus={ChangeStatus}
                      ChangeTodo={ChangeTodo} AddExtraTask={AddExtraTask} addCommentCreator={addCommentCreator}
                      SetExtraAsDoneCreator={SetExtraAsDoneCreator} DeleteTodo={DeleteTodo}/>)
}
let mapStateToProps = (state: AppStateType) => ({
    ProjectData: state.ProjectPage.ProjectData
})

export default React.memo(connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    SetTodoCreator,
    ChangeStatus,
    ChangeTodo,
    AddExtraTask,
    addCommentCreator,
    SetExtraAsDoneCreator,
    DeleteTodo
})(TodoPageContainer))

