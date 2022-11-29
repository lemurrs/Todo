import React, {useState} from "react";
import c from './Comments.module.less'
const Comments=({text,addCommentCreator,pathName,TodoId,ActiveTodo,CommentLength,setCommentLength,id})=>{
    const [replyText,setReplyText]=useState('')
    function handleCom(id) {
        addCommentCreator(pathName, TodoId, CommentLength, replyText,id)
        setCommentLength(CommentLength + 1)
        setReplyText('')
    }
    let Reply=ActiveTodo.filter((comment)=>comment.parentId)
    return(
        <>
            <div className={c.Comments}>
                <p className={c.Comments__text}>{text}</p>
                <input className={c.Comments__reply} placeholder={'Reply'} type={'text'} value={replyText} onChange={(e)=>{setReplyText(e.target.value)}}/>
            </div>

            <button disabled={!replyText} onClick={()=>{handleCom(id)}}>Reply</button>
            <div style={{transform:"translateX(2rem)"}}>
                {Reply.reverse().map((rep)=>rep.parentId===id &&<>
                    <Comments id={rep.id} text={rep.text} addCommentCreator={addCommentCreator} pathName={pathName} setCommentLength={setCommentLength} CommentLength={CommentLength} TodoId={TodoId} ActiveTodo={ActiveTodo} key={rep.id}/>
                </>)}
            </div>

        </>
    )
}
export default React.memo(Comments)