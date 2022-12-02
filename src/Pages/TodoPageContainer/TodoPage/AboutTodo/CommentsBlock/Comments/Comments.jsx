import React, {useState} from "react";
import c from './Comments.module.less'
const Comments=({text,addCommentCreator,pathName,TodoId,ActiveTodo,CommentLength,setCommentLength,id})=>{
    const [replyText,setReplyText]=useState('')
    const [replyActive,setReplyActive]=useState(false)
    function handleCom(id) {
        addCommentCreator(pathName, TodoId, CommentLength, replyText,id)
        setCommentLength(CommentLength + 1)
        setReplyText('')
    }
    let Reply=ActiveTodo.filter((comment)=>comment.parentId)
    return(
        <>
            <div className={c.test}>
            <div className={c.Comments}>
                <div className={c.Comments__ReplyBlock}>
                    <p className={c.Comments__text}>{text}</p>
                    {replyActive &&<input className={c.Comments__reply} placeholder={'Reply'} type={'text'} value={replyText} onChange={(e)=>{setReplyText(e.target.value)}}/>}
                    {!replyActive && <button className={c.Comments__activeReplyButton} onClick={()=>{setReplyActive(true)}}>Reply</button>}
                    {replyActive && <button disabled={!replyText} onClick={()=>{handleCom(id); setReplyActive(false)}}>Send</button>}
                </div>
            </div>

            <div style={{marginLeft:'1rem'}}>
                {Reply.reverse().map((rep)=>rep.parentId===id &&<>
                    <Comments id={rep.id} text={rep.text} addCommentCreator={addCommentCreator} pathName={pathName} setCommentLength={setCommentLength} CommentLength={CommentLength} TodoId={TodoId} ActiveTodo={ActiveTodo} key={rep.id}/>
                </>)}
            </div>
            </div>

        </>
    )
}
export default React.memo(Comments)