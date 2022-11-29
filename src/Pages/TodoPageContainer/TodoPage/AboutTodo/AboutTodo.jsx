import React, {useState} from "react";
import c from "../TodoPage.module.less";
import ExtraTask from "../ExtraTask/ExtraTask";
import TodoInfo from "../TodoInfo";
import Comments from "../Comments/Comments";

function AboutTodo({TodoId, ActiveTodo, pathName, SetExtraAsDoneCreator, AddExtraTask, ChangeTodo, addCommentCreator}) {

    const [extraTask, setExtraTask] = useState('')
    const [comment, setComment] = useState('')

    const addExtraTaskHandler = (extraTask) => {
        AddExtraTask(pathName, TodoId, extraTask, ActiveTodo[0].extraTasks.length + 1)

    }
    return <div className={c.TodoPage__AboutTodo}>
        <div className={c.AboutTodo__extra}>
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
        </div>
        <div className={c.info__info}>
            <h3>Todo Info</h3>
            {ActiveTodo[0] && <TodoInfo ActiveTodo={ActiveTodo[0]} pathName={pathName} ChangeTodo={ChangeTodo}/>}
        </div>
        <div className={c.info__comments}>
            <h3>Comments </h3>
            <input type={'text'} value={comment} onChange={e => setComment(e.target.value)}
                   style={{display: !TodoId && 'none'}}/>
            <button disabled={!TodoId || !comment} onClick={() => {
                addCommentCreator(pathName, TodoId, ActiveTodo[0].comments.length + 1, comment);
                setComment('')
            }}>add comment
            </button>
            {TodoId && ActiveTodo[0].comments.map(comment => <Comments id={comment.id} key={comment.id}
                                                                       text={comment.text}
                                                                       addCommentCreator={addCommentCreator}
                                                                       pathName={pathName} TodoId={TodoId}
                                                                       ActiveTodo={ActiveTodo[0].comments}/>)}
        </div>
    </div>
}

export default React.memo(AboutTodo)