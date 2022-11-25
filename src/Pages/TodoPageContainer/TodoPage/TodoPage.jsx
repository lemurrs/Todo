import React, {useEffect, useState} from "react";
import c from './TodoPage.module.less'
import {useLocation, useNavigate} from "react-router-dom";
import moment from "moment/moment";
import TodoInfo from "./TodoInfo";
import Modal from "../../../Components/Modal/Modal";



function TodoPage({ProjectData, SetTodoCreator, ChangeStatus,ChangeTodo}) {

    const loc = useLocation()
    const pathName = loc.pathname.replace('/', '')
    const [activeModal, setActiveModal] = useState(false)

    function ModalForm() {

        const [title, setTitle] = useState('')
        const [description, setDescr] = useState('')
        const [DateDays, setDateDays] = useState('')
        const [DateHours, setDateHours] = useState('')
        const [DateMinutes, setDateMinutes] = useState('')

        function HandleSubmit(e) {
            e.preventDefault()
            const priority = document.getElementById('priority').value
            const created = moment().format('MMMM Do YYYY, h:mm:ss a');
            const deadLine = moment().add(DateDays, 'days').add(DateHours, 'hours').add(DateMinutes, 'minutes').format("MMMM Do YYYY, h:mm:ss a")
            SetTodoCreator(pathName, ProjectData.filter(el => el.name === pathName)[0].Todo.length + 1, title, description, priority, created, deadLine)
            setActiveModal(false)
        }

        return (
            <form onSubmit={(e) => HandleSubmit(e)}>
                <input value={title} onChange={(e) => {
                    setTitle(e.target.value)
                }} type={'text'} placeholder={'title'}/>
                <input value={description} onChange={(e) => {
                    setDescr(e.target.value)
                }} type={'text'} placeholder={'descr'}/>

                <select id="priority">
                    <option value={''} label="Priority: "/>
                    <option value={'Urgent and important'} label="Urgent and important"/>
                    <option value={'Urgent'} label="Urgent"/>
                    <option value={'Important'} label="important"/>
                    <option value={'Not urgent and not important'} label="Not urgent and not important"/>
                </select>
                <div className={c.FormDate}>
                    <h5>Deadline</h5>
                    <input type={"number"} placeholder={'Days'} min={0} value={DateDays} onChange={(e) => {
                        setDateDays(e.target.value)
                    }}/>
                    <input type={"number"} placeholder={'Hours'} min={0} value={DateHours} onChange={(e) => {
                        setDateHours(e.target.value)
                    }}/>
                    <input type={"number"} placeholder={'Minutes'} min={0} value={DateMinutes} onChange={(e) => {
                        setDateMinutes(e.target.value)
                    }}/>
                </div>
                <button>Save</button>
            </form>
        )
    }


    let [QueuedTodo, setQueuedTodo] = useState()
    let [DevelopmentTodo, setDevelopmentTodo] = useState()
    let [DoneTodo, setDoneTodo] = useState('')

    if (ProjectData.filter(el => el.name === pathName)[0].Todo) {
        QueuedTodo = ProjectData.filter(el => el.name === pathName)[0].Todo.filter(el => el.status === 'Queue')
        DevelopmentTodo = ProjectData.filter(el => el.name === pathName)[0].Todo.filter(el => el.status === 'Development')
        DoneTodo = ProjectData.filter(el => el.name === pathName)[0].Todo.filter(el => el.status === 'Done')
    }
    console.log(ProjectData)

    let [ActiveTodo, setActiveTodo] = useState(null)
    const [TodoId, setTodoId] = useState(null)
    const [queueTodo, setQueueTodo] = useState([])
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

    const navigate = useNavigate()

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

    ActiveTodo = ProjectData.filter(el => el.name === pathName)[0].Todo.filter(el => el.id === TodoId)
    return (<section className={c.TodoPage}>
        <div className={c.TodoPage__info}>
            <div className={c.info__info}>
                {ActiveTodo && <TodoInfo ActiveTodo={ActiveTodo[0]} pathName={pathName} ChangeTodo={ChangeTodo}/>}
            </div>
            <div className={c.info__create}>
                <div className={c.TodoPage__todoCreator}>
                    <button className={c.TodoPage__button} onClick={() => setActiveModal(true)}>Create Todo</button>
                </div>
            </div>
            <div className={c.info__dragDrop}>
                {boards.map(board => <div className={c.Board} onDragOver={(e) => dragOverHandler(e)}
                                          onDrop={(e) => dropCardHandler(e, board)}>
                        <div className={c.Board__title}>{board.text}</div>
                        {board.todos.map(todo =>
                            <div className={`${c.item} ${todo.id === TodoId ? c.activeItem : undefined}`} draggable="true"
                                 onClick={(e) => {
                                     console.log(e)
                                 }}
                                 onDragStart={(e) => dragStartHandler(e, board, todo)}
                                 onDragLeave={(e) => dragLeaveHandler(e)}
                                 onDragEnd={(e) => dragEndHandler(e, todo)}
                                 onDragOver={(e) => dragOverHandler(e)}
                                 onDrop={(e) => dropHandler(e, board, todo)}
                            >{todo.title}</div>
                        )}
                    </div>
                )}
            </div>
            <div className={c.info__extraTodo}>Dop zadachi 3</div>
            <div className={c.info__comments}>Comments 5</div>
        </div>

        <button onClick={() => navigate('/')}>Back</button>
        <Modal active={activeModal} setActive={setActiveModal}>
            <ModalForm/>
        </Modal>

    </section>)

}

export default React.memo(TodoPage)