import React, {useState} from "react";
import c from "../../TodoPage.module.less";
import Todo from "../../Todo/Todo";
import {ActionCreator} from "redux";
import {ChangeStatusType, DeleteTodoType} from "../../../../../Types";
import {ITodo, Project} from "../../../../../Interfaces";

type Props={
    setTodoId:(a:number | null)=>void,

    pathName:string,
    DeleteTodo:ActionCreator<DeleteTodoType>,
    svg:SVGElement,
    TodoId:number | null,
    ChangeStatus:ActionCreator<ChangeStatusType>,
    currentProject:Project,
    filteredResult:ITodo[]
}

const DragDrop:React.FC<Props>=({setTodoId,pathName,DeleteTodo,svg,TodoId,ChangeStatus,currentProject,filteredResult})=>{

    let QueuedTodo;
    let DevelopmentTodo;
    let DoneTodo;
    if (currentProject.Todo && !filteredResult) {
        QueuedTodo = currentProject.Todo.filter(el => el.status === 'Queue')
        DevelopmentTodo = currentProject.Todo.filter(el => el.status === 'Development')
        DoneTodo = currentProject.Todo.filter(el => el.status === 'Done')
    } else if (filteredResult) {
        QueuedTodo = filteredResult.filter(el => el.status === 'Queue')
        DevelopmentTodo = filteredResult.filter(el => el.status === 'Development')
        DoneTodo = filteredResult.filter(el => el.status === 'Done')
    }

    let [boards, setBoards] = useState<any[]>([
        {id: 1, text: 'Queue', todos: QueuedTodo},
        {id: 2, text: 'Development', todos: DevelopmentTodo},
        {id: 3, text: 'Done', todos: DoneTodo},
    ])
    boards[0].todos = QueuedTodo
    boards[1].todos = DevelopmentTodo
    boards[2].todos = DoneTodo

    const [currentBoard, setCurrentBoard] = useState<null|any>(null)
    const [currentItem, setCurrentItem] = useState<null | ITodo>(null)

    function dragStartHandler(e:React.DragEvent, board:any, todo:ITodo) {
        setCurrentBoard(board)
        setCurrentItem(todo)
        setTodoId(todo.id)
    }
    console.log(boards)

    function dragLeaveHandler(e:React.DragEvent) {
        (e.target as HTMLDivElement).style.boxShadow = 'none'
    }

    function dragOverHandler(e:React.DragEvent) {
        e.preventDefault()
        if ((e.target as HTMLDivElement).className === 'item') {
            (e.target as HTMLDivElement).style.boxShadow = '0 2px 3px gray'
        }
    }

    function dragEndHandler(e:React.DragEvent, todo:ITodo) {
        (e.target as HTMLDivElement).style.boxShadow = 'none'
        setTodoId(todo.id)
    }

    function dropHandler(e:React.DragEvent, board:any, todo:ITodo) {
        e.stopPropagation()
        const currentIndex = currentBoard.todos.indexOf(currentItem)
        currentBoard.todos.splice(currentIndex, 1)
        const dropIndex = board.todos.indexOf(todo)
        board.todos.splice(dropIndex + 1, 0, currentItem)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
    }

    function dropCardHandler(e:React.DragEvent, board:any) {
        board.todos.push(currentItem)
        const currentIndex = currentBoard.todos.indexOf(currentItem)
        currentBoard.todos.splice(currentIndex, 1)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
        ChangeStatus(pathName, TodoId, board.text)
    }

    return(<div className={c.info__dragDrop}>
        {boards.map(board => <div className={c.Board} key={board.id} onDragOver={(e) => dragOverHandler(e)}
                                  onDrop={(e) => dropCardHandler(e, board)}>
                <div className={c.Board__title}>{board.text}</div>
                {board.todos?.map((todo:ITodo) =>
                    <Todo setTodoId={setTodoId} pathName={pathName} key={todo.id} DeleteTodo={DeleteTodo} svg={svg} todo={todo} TodoId={TodoId} board={board} dragStartHandler={dragStartHandler} dragLeaveHandler={dragLeaveHandler} dragEndHandler={dragEndHandler} dragOverHandler={dragOverHandler} dropHandler={dropHandler}/>
                )}
            </div>
        )}
    </div>)
}
export default React.memo(DragDrop)