import {IComments, ExtraTask, Project, ITodo} from "./Interfaces";
import {
    ADD_COMMENT,
    ADD_EXTRA, CHANGE_STATUS, CHANGE_TODO,
    CREATE_PROJECT,
    DELETE_TODO,
    SET_EXTRA_AS_DONE,
    SET_TODO
} from "./redux/ProjectPage-reducer";
import {ActionCreator} from "redux";

export type TodoPageProps = {
    SetTodoCreator:ActionCreator<SetTodoCreatorType>,
    ProjectData:Project[],
    ChangeStatus:ActionCreator<ChangeStatusType>,
    ChangeTodo:ActionCreator<ChangeTodoType>,
    AddExtraTask:ActionCreator<AddExtraTaskType>,
    addCommentCreator:ActionCreator<addCommentCreatorType>,
    SetExtraAsDoneCreator:ActionCreator<SetExtraAsDoneCreatorType>,
    DeleteTodo:ActionCreator<DeleteTodoType>
}

export type ProjectPageProps={

    ProjectData:Project[],
        ProjectCreator:ActionCreator<ProjectCreatorType>

}

export type addCommentCreatorType={
    type:typeof ADD_COMMENT,
    name:string,
    id:number,
    text:string,
    parentId:number,
}
export type SetExtraAsDoneCreatorType={
    type:typeof SET_EXTRA_AS_DONE,
    name:string,
    id:number,
    taskId:number
}
export type SetTodoCreatorType={
    type:typeof SET_TODO,
    name: string,
    title: string,
    description: string,
    priority: string,
    created: Date,
    deadLine: Date,
    status: string,
    extraTasks:ExtraTask[],
    comments:IComments[],
    files:File
}
export type AddExtraTaskType={
    type:typeof ADD_EXTRA,
    extra:string,
    name:string,
    id:number,
}
export type ProjectCreatorType={
    type:typeof CREATE_PROJECT,
    name: string,
}
export type ChangeStatusType={
    type:typeof CHANGE_STATUS,
    name: string,
    id: number,
    status: string
}

export type DeleteTodoType={
    type:typeof DELETE_TODO,
    name:string,
    id:number,
}
export type ChangeTodoType={
    type:typeof CHANGE_TODO,
    name:string,
    id:number,
    title:string,
    description:string,
    priority:string,
    deadLine:Date,
}
export type ActionTypes =ChangeTodoType | DeleteTodoType | ChangeStatusType | ProjectCreatorType | AddExtraTaskType | SetTodoCreatorType | SetExtraAsDoneCreatorType | addCommentCreatorType
