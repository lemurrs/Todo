import React from "react";
import c from '../TodoPage.module.less'

function Todo({
                  todo,
                  TodoId,
                  board,
                  dragStartHandler,
                  dragLeaveHandler,
                  dragEndHandler,
                  dragOverHandler,
                  dropHandler,
                  svg,
                  DeleteTodo,
                  pathName,setTodoId
              }) {
    return (<>

        <div className={`${c.item} ${todo.id === TodoId ? c.activeItem : undefined}`} draggable="true"
             onDragStart={(e) => dragStartHandler(e, board, todo)}
             onDragLeave={(e) => dragLeaveHandler(e)}
             onDragEnd={(e) => dragEndHandler(e, todo)}
             onDragOver={(e) => dragOverHandler(e)}
             onDrop={(e) => dropHandler(e, board, todo)}
             key={todo.id}
        >
            <span>{todo.title}</span>
            <svg className={c.itemSvg} onClick={()=>{
                setTodoId(null)
                    DeleteTodo(pathName,todo.id)}}>
                <use xlinkHref={svg + "#icon-cancel-circle"}>
                </use>
            </svg>
        </div>

    </>)
}

export default React.memo(Todo)