import React, {useState} from "react";
import c from './Comments.module.less'
import {ActionCreator} from "redux";
import {addCommentCreatorType} from "../../../../../../Types";
import {IComments} from "../../../../../../Interfaces";
import moment from "moment";

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
    const [showReplyActive,setShowReplyActive]=useState(false)
    function handleCom(id:number) {
            addCommentCreator(pathName, TodoId, replyText,id)
            setReplyText('')
    }

    let Reply= TodoComments.filter((comment)=>comment.parentId)
    return(
        <>
            <div className={c.Comments}>
                <div className={c.Comments__ReplyBlock}>
                    <p className={c.Comments__text}>{text}</p>
                    <div className={c.comments__wrapper} style={{background:replyActive ? "#100f0f" : "initial"}}>
                        {replyActive && <input className={c.Comments__reply} placeholder={'Reply'} type={'text'} value={replyText} onChange={(e)=>{setReplyText(e.target.value)}}/>}
                        {!replyActive &&  <button className={c.Comments__activeReplyButton} style={{color:showReplyActive? "orange":""}} onClick={()=>{setReplyActive(true)}}>Reply</button>}
                        {Reply.filter((el)=>el.parentId===id).length>0 && !replyActive &&<button className={c.Comments__activeReplyButton} onClick={()=>{setShowReplyActive(!showReplyActive)}}> {Reply.filter((el)=>el.parentId===id).length} replies</button>}
                        {replyActive &&  <button disabled={!replyText} className={c.GoldButton} onClick={()=>{handleCom(id); setReplyActive(false)}}>Send</button>}
                        {replyActive && <button className={c.GoldButton} onClick={()=>{setReplyActive(false); setReplyText('')}}>Cancel</button>}
                    </div>
                </div>
            </div>


            <div style={{marginLeft:'1rem',borderLeft:'1px dashed orange'}}>
                {showReplyActive && Reply.reverse().map((rep)=>rep.parentId===id && <Comments id={rep.id} text={rep.text} addCommentCreator={addCommentCreator} pathName={pathName} TodoId={TodoId} TodoComments={TodoComments} key={rep.id}/>
                )}
            </div>
        </>
    )
}
export default React.memo(Comments)