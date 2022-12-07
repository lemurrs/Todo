import React from "react";
import c from './Modal.module.less'

type Props={
    active:boolean,
    setActive:(a:boolean)=>void,
    children:React.ReactNode
}

const Modal:React.FC<Props> = ({active,setActive, children})=>{
    return (<div className={active? `${c.modal} ${c.active}`:` ${c.modal}`} onClick={()=> setActive(false)}>
        <div className={(active?`${c.modal__content} ${c.active}`: `${c.modal__content} ${c.Purple}`)} onClick={e=> e.stopPropagation()}>
            {children}
        </div>
    </div>)
}
export default Modal