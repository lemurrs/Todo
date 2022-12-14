import React, {useState} from "react";
import c from './Comments.module.less'
import {ActionCreator} from "redux";
import {addCommentCreatorType} from "../../../../../../Types";
import {IComments} from "../../../../../../Interfaces";

type Props={
    text:string,
    addCommentCreator:ActionCreator<addCommentCreatorType>,
    pathName:string,
    TodoId:number|null,
    TodoComments:IComments[],
    id:number
}
const Comments:React.FC<Props>=({text,addCommentCreator,pathName,TodoId,TodoComments,id})=>{
    const [replyText,setReplyText]=useState('')
    const [replyActive,setReplyActive]=useState(false)
    function handleCom(id:number) {
            addCommentCreator(pathName, TodoId, replyText,id)
            setReplyText('')
    }

    let Reply= TodoComments.filter((comment)=>comment.parentId)
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
                {Reply.reverse().map((rep)=>rep.parentId===id && <Comments id={rep.id} text={rep.text} addCommentCreator={addCommentCreator} pathName={pathName} TodoId={TodoId} TodoComments={TodoComments} key={rep.id}/>
                )}
            </div>
            </div>

        </>
    )
}
export default React.memo(Comments)