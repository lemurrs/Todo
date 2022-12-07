import React from "react";
import c from "./ExtraTask.module.less"
import svg from '../../../../../../common/svg/symbol-defs.svg'
import {ActionCreator} from "redux";
import {SetExtraAsDoneCreatorType} from "../../../../../../Types";

type Props={
    text:string,
    status:string,
    id:number,
    SetExtraAsDoneCreator:ActionCreator<SetExtraAsDoneCreatorType>,
    pathName:string,
    TodoId:number | null
}

const ExtraTask:React.FC<Props>=({text,status,id,SetExtraAsDoneCreator,pathName,TodoId})=>{

    return<div className={c.extraBlock}>
   <p className={c.ExtraTask} style={{background:status==='Done'? 'green' : 'initial'}}>{text}</p>

        <svg className={c.extraDoneSvg} onClick={()=>{SetExtraAsDoneCreator(pathName,TodoId,id)}}>
            <use xlinkHref={svg+'#icon-done'}>
            </use>
        </svg>

    </div>
}
export default React.memo(ExtraTask)