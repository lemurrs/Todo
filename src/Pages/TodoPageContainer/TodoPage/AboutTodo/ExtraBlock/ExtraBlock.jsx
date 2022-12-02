import React, {useEffect, useState} from "react";
import c from "../../TodoPage.module.less";
import ExtraTask from "./ExtraTask/ExtraTask";
function ExtraBlock({TodoId,ActiveTodo,pathName,SetExtraAsDoneCreator,AddExtraTask}){

    const [extraTask, setExtraTask] = useState('')
    const[Tasklength,setTaskLength]=useState( ActiveTodo[0].extraTasks.length+1)

    useEffect(()=>{
        setTaskLength(ActiveTodo[0].comments.length+1)
    },[ActiveTodo[0].id])

    const addExtraTaskHandler = (extraTask) => {
        AddExtraTask(pathName, TodoId, extraTask, Tasklength)
        setTaskLength(Tasklength+1)
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