import React from "react";
import c from '../TodoPage.module.less'
import {ITodo} from "../../../../Interfaces";
import {ActionCreator} from "redux";
import { DeleteTodoType} from "../../../../Types";

type Props={
    todo:ITodo,
    TodoId:number | null,
    board:any,
    dragStartHandler:(e:React.DragEvent,board:any,todo:ITodo)=>void,
    dragLeaveHandler:(e:React.DragEvent)=>void,
    dragEndHandler:(e:React.DragEvent,todo:ITodo)=>void,
    dragOverHandler:(e:React.DragEvent)=>void,
    dropHandler:(e:React.DragEvent,board:any,todo:ITodo)=>void,
    svg:SVGElement,
    DeleteTodo:ActionCreator<DeleteTodoType>,
    pathName:string,
    setTodoId:(id:number | null)=>void
}

const Todo:React.FC<Props>=({
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
              }) =>{
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