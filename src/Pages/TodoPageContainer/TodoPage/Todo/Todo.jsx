import React from "react";
import c from '../TodoPage.module.less'
import svg from '../../../../common/svg/symbol-defs.svg'

function Todo({value}) {
    return <div className={c.todo}>
        <span className={c.todo__delete}>
            <svg>
                <use xlinkHref={svg + '#icon-cross'}></use>
            </svg>
        </span>
        {value}
    </div>
}

export default React.memo(Todo)