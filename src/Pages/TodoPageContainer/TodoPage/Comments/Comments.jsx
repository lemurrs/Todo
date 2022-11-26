import React, {useState} from "react";
import c from './Comments.module.less'
import {saveReply} from "../../../../redux/ProjectPage-reducer";
const Comments=({id,text,addCommentCreator,pathName,ActiveTodo,TodoId})=>{
    const [reply,setReply]=useState('')
    // const [replys,setReplys]=useState([])
    // const AddReply=()=>{
    //     setReplys([...replys,reply])
    //     saveReply(pathName,TodoId,id,reply)
    //     addCommentCreator(pathName,TodoId,ActiveTodo.length,reply)
    // }
    return(
        <div className={c.Comments}>
            <p className={c.Comments__text}>{text}</p>
            {/*<input type={'text'} value={reply} onChange={e=>{setReply(e.target.value);}}/>*/}
            {/*<button onClick={AddReply}>Reply</button>*/}
            {/*<div className={c.Comment}>*/}
            {/*{*/}
            {/*    replys.map(el=><Comments text={el.text} id={el.id} addCommentCreator={addCommentCreator} pathName={pathName} ActiveTodo={ActiveTodo} TodoId={TodoId}/>)*/}
            {/*}*/}
            {/*</div>*/}
        </div>
    )
}
export default React.memo(Comments)