import React from "react";
import c from "../TodoPage.module.less";
import svg from "../../../../common/svg/symbol-defs.svg";
import {useNavigate} from "react-router-dom";

function CreateTodo({setActiveModal}) {

    const navigate = useNavigate()

    return(
    <div className={c.TodoPage__createTodo}>
        <button className={c.TodoPage__button} onClick={() => setActiveModal(true)}>Create Todo</button>
        <svg onClick={() => navigate('/')} className={c.BackArrow}>
            <use xlinkHref={svg + '#icon-arrow-left2'}></use>
        </svg>
    </div>)
}

export default React.memo(CreateTodo)