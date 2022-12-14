import React, {useState} from "react";
import c from "../../TodoPage.module.less";
import ExtraTask from "./ExtraTask/ExtraTask";
import {ITodo} from "../../../../../Interfaces";
import {ActionCreator} from "redux";
import {AddExtraTaskType, SetExtraAsDoneCreatorType} from "../../../../../Types";

type Props={
    TodoId:number|null,
    ActiveTodo:ITodo[],
    pathName:string,
    SetExtraAsDoneCreator:ActionCreator<SetExtraAsDoneCreatorType>,
    AddExtraTask:ActionCreator<AddExtraTaskType>
}
const ExtraBlock:React.FC<Props>=({TodoId,ActiveTodo,pathName,SetExtraAsDoneCreator,AddExtraTask})=>{

    const [extraTask, setExtraTask] = useState('')
    const addExtraTaskHandler = (extraTask:string) => {
        AddExtraTask(pathName, TodoId, extraTask)
    }

    return (<div className={c.AboutTodo__extra}>
        <h3>Extra Tasks</h3>
        <div className={c.extra__tasks}>
            {TodoId && ActiveTodo[0].extraTasks.map(el => <ExtraTask TodoId={TodoId} pathName={pathName}
                                                                     key={el.id} text={el.text}
                                                                     status={el.status} id={el.id}
                                                                     SetExtraAsDoneCreator={SetExtraAsDoneCreator}/>)}
        </div>
        <div className={c.extra__createTask} style={{display: !TodoId ? 'none' : 'flex'}}>
            <input placeholder={'Task'} value={extraTask} onChange={e => {
                setExtraTask(e.target.value)
            }}/>
            <button disabled={!TodoId || !extraTask} onClick={() => {
                addExtraTaskHandler(extraTask);
                setExtraTask('')
            }}>Create Task
            </button>
        </div>
    </div>)
}
export default React.memo(ExtraBlock)