import React, {useEffect, useState} from "react";
import c from "../TodoPage.module.less";
import ExtraBlock from "./ExtraBlock/ExtraBlock";
import CommentsBlock from "./CommentsBlock/CommentsBlock";
import InfoBlock from "./InfoBlock/InfoBlock";
import {ActionCreator} from "redux";
import {addCommentCreatorType, AddExtraTaskType, ChangeTodoType, SetExtraAsDoneCreatorType} from "../../../../Types";
import {Project} from "../../../../Interfaces";

type Props={
    TodoId:number,
    pathName:string,
    SetExtraAsDoneCreator:ActionCreator<SetExtraAsDoneCreatorType>,
    AddExtraTask:ActionCreator<AddExtraTaskType>,
    ChangeTodo:ActionCreator<ChangeTodoType>,
    addCommentCreator:ActionCreator<addCommentCreatorType>,
    currentProject:Project
}

const AboutTodo:React.FC<Props>=({TodoId, pathName, SetExtraAsDoneCreator, AddExtraTask, ChangeTodo, addCommentCreator,currentProject}) =>{

    let ActiveTodo = currentProject.Todo.filter(el => el.id === TodoId)

    return <div className={c.TodoPage__AboutTodo}>
        <ExtraBlock TodoId={TodoId} ActiveTodo={ActiveTodo} pathName={pathName} SetExtraAsDoneCreator={SetExtraAsDoneCreator} AddExtraTask={AddExtraTask}/>
        <InfoBlock TodoId={TodoId} ActiveTodo={ActiveTodo} pathName={pathName} ChangeTodo={ChangeTodo}/>
        <CommentsBlock TodoId={TodoId} ActiveTodo={ActiveTodo} pathName={pathName} addCommentCreator={addCommentCreator}/>
    </div>
}

export default React.memo(AboutTodo)