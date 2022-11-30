import React, {useEffect, useState} from "react";
import c from "../TodoPage.module.less";
import ExtraTask from "../ExtraTask/ExtraTask";
import TodoInfo from "../TodoInfo/TodoInfo";
import Comments from "../Comments/Comments";

function AboutTodo({TodoId, ActiveTodo, pathName, SetExtraAsDoneCreator, AddExtraTask, ChangeTodo, addCommentCreator,currentProject}) {

    const [extraTask, setExtraTask] = useState('')
    const [comment, setComment] = useState('')
    const[Tasklength,setTaskLength]=useState( ActiveTodo[0].extraTasks.length+1)
    const [CommentLength,setCommentLength]=useState(ActiveTodo[0].comments.length+1)
    useEffect(()=>{
        setCommentLength(ActiveTodo[0].extraTasks.length+1)
        setTaskLength(ActiveTodo[0].comments.length+1)
    },[ActiveTodo[0].id])

    const addExtraTaskHandler = (extraTask) => {
        AddExtraTask(pathName, TodoId, extraTask, Tasklength)
        setTaskLength(Tasklength+1)

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
            {ActiveTodo[0] && <TodoInfo ActiveTodo={ActiveTodo[0]} pathName={pathName} ChangeTodo={ChangeTodo} TodoId={TodoId}/>}
        </div>
        <div className={c.info__comments}>
            <h3>Comments </h3>
            <div className={c.comments__wrapper}>
            <input type={'text'} value={comment} onChange={e => setComment(e.target.value)}
                   style={{display: !TodoId && 'none'}}/>
            <button className={c.comments__WriteCommentButton} disabled={!TodoId || !comment} onClick={() => {
                addCommentCreator(pathName, TodoId,CommentLength, comment);
                setCommentLength(CommentLength+1)
                setComment('')
            }}>Comment
            </button>
            </div>
            {TodoId && ActiveTodo[0].comments.filter(el=>el.parentId===undefined).reverse().map(comment => <Comments id={comment.id} key={comment.id}
                                                                       text={comment.text}
                                                                       addCommentCreator={addCommentCreator}
                                                                       pathName={pathName} TodoId={TodoId}
                                                                       ActiveTodo={ActiveTodo[0].comments}
                                                                       CommentLength={CommentLength}
                                                                       setCommentLength={setCommentLength}/>)}
        </div>
    </div>
}

export default React.memo(AboutTodo)