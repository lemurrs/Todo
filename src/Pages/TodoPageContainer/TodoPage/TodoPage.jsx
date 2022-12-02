import React, {useState} from "react";
import c from './TodoPage.module.less'
import {useLocation} from "react-router-dom";
import Modal from "../../../Components/Modal/Modal";
import ModalForm from "./ModalForm/ModalForm";
import AboutTodo from "./AboutTodo/AboutTodo";
import CreateTodo from "./CreateTodo/CreateTodo";
import DragDropWithFilter from "./DragDropWithFilter/DragDropWithFilter";

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

    const loc = useLocation()

    //To get data from chosen project we need to get his unique name and then filter all projects by this name
    const pathName = loc.pathname.replace('/', '')
    const currentProject = ProjectData.filter(el => el.name === pathName)[0]

    const [activeModal, setActiveModal] = useState(false)
    const [TodoId, setTodoId] = useState(null)



    return (
        <section className={c.TodoPage}>
            <CreateTodo setActiveModal={setActiveModal}/>

            <DragDropWithFilter currentProject={currentProject} TodoId={TodoId} pathName={pathName} DeleteTodo={DeleteTodo}
                          setTodoId={setTodoId} ChangeStatus={ChangeStatus}/>

            {TodoId && <AboutTodo pathName={pathName} TodoId={TodoId} ChangeTodo={ChangeTodo}
                                  AddExtraTask={AddExtraTask} addCommentCreator={addCommentCreator}
                                  SetExtraAsDoneCreator={SetExtraAsDoneCreator} currentProject={currentProject}/>}

            <Modal active={activeModal} setActive={setActiveModal}>
                <ModalForm pathName={pathName} setActiveModal={setActiveModal} SetTodoCreator={SetTodoCreator} currentProject={currentProject}/>
            </Modal>
        </section>)

}

export default React.memo(TodoPage)