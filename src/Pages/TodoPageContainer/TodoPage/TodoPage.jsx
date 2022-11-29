import React, {useEffect, useState} from "react";
import c from './TodoPage.module.less'
import {useLocation, useNavigate} from "react-router-dom";
import Modal from "../../../Components/Modal/Modal";
import svg from '../../../common/svg/symbol-defs.svg'
import DragDrop from "./DragDrop/DragDrop";
import ModalForm from "./ModalForm/ModalForm";
import AboutTodo from "./AboutTodo/AboutTodo";

function TodoPage({
                      ProjectData,
                      SetTodoCreator,
                      ChangeStatus,
                      ChangeTodo,
                      AddExtraTask,
                      addCommentCreator,
                      SetExtraAsDoneCreator,
                      DeleteTodo
                  }) {

    const navigate = useNavigate()
    const loc = useLocation()

    const pathName = loc.pathname.replace('/', '')

    const currentProject = ProjectData.filter(el => el.name === pathName)[0]

    const [activeModal, setActiveModal] = useState(false)

    const [TodoId, setTodoId] = useState(null)
    let ActiveTodo = currentProject.Todo.filter(el => el.id === TodoId)

    //FilterTodo
    let filteredResult=currentProject.Todo
    const [filterTitle, setFilterTitle] = useState('')
    const [filterId, setFilterId] = useState('')

    if (filterTitle) filteredResult=(filteredResult.filter(todo => {
        return todo.title.includes(filterTitle)
    }))

    if (filterId) filteredResult=(filteredResult.filter(todo => {
        return todo.id === filterId
    }))

    return (<section className={c.TodoPage}>
        <div className={c.TodoPage__createTodo}>
            <button className={c.TodoPage__button} onClick={() => setActiveModal(true)}>Create Todo</button>
            <svg onClick={() => navigate('/')} className={c.BackArrow}>
                <use xlinkHref={svg + '#icon-arrow-left2'}></use>
            </svg>
        </div>
        <div className={c.TodoPage__filterTodo}>
            <input value={filterId} onChange={(e) => setFilterId(+e.target.value)} placeholder={'id'} type={'number'}/>
            <input value={filterTitle} onChange={(e) => setFilterTitle(e.target.value)} placeholder={'title'}/>
        </div>
        <DragDrop TodoId={TodoId} pathName={pathName} DeleteTodo={DeleteTodo} svg={svg} setTodoId={setTodoId}
                  ChangeStatus={ChangeStatus} filteredResult={filteredResult} currentProject={currentProject}/>
        <Modal active={activeModal} setActive={setActiveModal}>
            <ModalForm pathName={pathName} setActiveModal={setActiveModal} SetTodoCreator={SetTodoCreator}
                       currentProject={currentProject}/>
        </Modal>
        <AboutTodo pathName={pathName} TodoId={TodoId} ActiveTodo={ActiveTodo} ChangeTodo={ChangeTodo} AddExtraTask={AddExtraTask} addCommentCreator={addCommentCreator} SetExtraAsDoneCreator={SetExtraAsDoneCreator}/>
    </section>)

}

export default React.memo(TodoPage)