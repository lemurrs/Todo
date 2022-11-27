import React from "react";
import c from './Comments.module.less'
const Comments=({text})=>{
    return(
        <>
            <p className={c.Comments__text}>{text}</p>
        </>
    )
}
export default React.memo(Comments)