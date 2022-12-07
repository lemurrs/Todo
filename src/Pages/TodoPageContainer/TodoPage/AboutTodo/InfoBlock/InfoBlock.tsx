import React from "react";
import c from "../../TodoPage.module.less";
import TodoInfo from "./TodoInfo/TodoInfo";
import {ITodo} from "../../../../../Interfaces";
import {ActionCreator} from "redux";
import {ChangeTodoType} from "../../../../../Types";

type Props={
    ActiveTodo:ITodo[],
    pathName:string,
    ChangeTodo:ActionCreator<ChangeTodoType>,
    TodoId:number
}

const InfoBlock:React.FC<Props>=({ActiveTodo,pathName,ChangeTodo,TodoId})=>{
    return(
        <div className={c.info__info}>
            <h3>Todo Info</h3>
            {ActiveTodo[0] && <TodoInfo ActiveTodo={ActiveTodo[0]} pathName={pathName} ChangeTodo={ChangeTodo} TodoId={TodoId}/>}
        </div>
    )
}
export default React.memo(InfoBlock)