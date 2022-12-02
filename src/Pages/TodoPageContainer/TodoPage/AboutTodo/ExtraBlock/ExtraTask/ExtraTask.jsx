import React from "react";
import c from "./ExtraTask.module.less"
import svg from '../../../../../../common/svg/symbol-defs.svg'

function ExtraTask({text,status,id,SetExtraAsDoneCreator,pathName,TodoId}){

    return<div className={c.extraBlock}>
   <p className={c.ExtraTask} style={{background:status==='Done' && 'green'}}>{text}</p>

        <svg className={c.extraDoneSvg} onClick={()=>{SetExtraAsDoneCreator(pathName,TodoId,id)}}>
            <use xlinkHref={svg+'#icon-done'}>
            </use>
        </svg>

    </div>
}
export default React.memo(ExtraTask)