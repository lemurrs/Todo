import React, {useEffect, useState} from "react";
import c from "../../TodoPage.module.less";
import Comments from "./Comments/Comments.tsx";
import {ActionCreator} from "redux";
import {addCommentCreatorType} from "../../../../../Types";
import {ITodo} from "../../../../../Interfaces";

type Props={
    addCommentCreator:ActionCreator<addCommentCreatorType>,
    TodoId:number|null,
    pathName:string,
    ActiveTodo:ITodo[]
}

const CommentsBlock:React.FC<Props>=({addCommentCreator,TodoId,pathName,ActiveTodo})=>{

    const [comment, setComment] = useState('')

    return(<div className={c.info__comments}>
            <h3>Comments </h3>
            <div className={c.comments__wrapper}>
                <input type={'text'} value={comment} onChange={e => setComment(e.target.value)}
                       style={{display: !TodoId ? 'none' : 'block'}}/>
                <button className={c.comments__WriteCommentButton} disabled={!TodoId || !comment} onClick={() => {
                    addCommentCreator(pathName, TodoId,comment);
                    setComment('')
                }}>Comment
                </button>
            </div>
            {TodoId && ActiveTodo[0].comments.filter(el=>el.parentId===undefined).reverse().map(comment => <Comments id={comment.id} key={comment.id}
                                                                                                                     text={comment.text}
                                                                                                                     addCommentCreator={addCommentCreator}
                                                                                                                     pathName={pathName} TodoId={TodoId}
                                                                                                                     TodoComments={ActiveTodo[0].comments}/>)}
        </div>
    )
}
export default React.memo(CommentsBlock)