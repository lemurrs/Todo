import React, {useState} from "react";
import c from "../TodoPage.module.less";
import Todo from "../Todo/Todo";

function DragDrop({setTodoId,pathName,DeleteTodo,svg,TodoId,ChangeStatus,currentProject,filteredResult}){

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

    let [boards, setBoards] = useState([
        {id: 1, text: 'Queue', todos: QueuedTodo},
        {id: 2, text: 'Development', todos: DevelopmentTodo},
        {id: 3, text: 'Done', todos: DoneTodo},
    ])
    boards[0].todos = QueuedTodo
    boards[1].todos = DevelopmentTodo
    boards[2].todos = DoneTodo

    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)

    function dragStartHandler(e, board, todo) {
        setCurrentBoard(board)
        setCurrentItem(todo)
        setTodoId(todo.id)
    }

    function dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    function dragOverHandler(e, todo) {
        e.preventDefault()
        if (e.target.className === 'item') {
            e.target.style.boxShadow = '0 2px 3px gray'
        }
    }

    function dragEndHandler(e, todo) {
        e.target.style.boxShadow = 'none'
        setTodoId(todo.id)
    }

    function dropHandler(e, board, todo) {
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

    function dropCardHandler(e, board) {
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
        {boards.map(board => <div className={c.Board} key={board.text.length} onDragOver={(e) => dragOverHandler(e)}
                                  onDrop={(e) => dropCardHandler(e, board)}>
                <div className={c.Board__title}>{board.text}</div>
                {board.todos.map(todo =>
                    <Todo setTodoId={setTodoId} pathName={pathName} key={todo.id} DeleteTodo={DeleteTodo} svg={svg} todo={todo} TodoId={TodoId} board={board} dragStartHandler={dragStartHandler} dragLeaveHandler={dragLeaveHandler} dragEndHandler={dragEndHandler} dragOverHandler={dragOverHandler} dropHandler={dropHandler}/>
                )}
            </div>
        )}
    </div>)
}
export default React.memo(DragDrop)