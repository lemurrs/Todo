import React, {useState} from "react";
import c from "../TodoPage.module.less";
import DragDrop from "./DragDrop/DragDrop";
import svg from "../../../../common/svg/symbol-defs.svg";
import {ITodo, Project} from "../../../../Interfaces";
import {ActionCreator} from "redux";
import {ChangeStatusType, DeleteTodoType} from "../../../../Types";

type Props={
    currentProject:Project,
    TodoId:number | null,
    pathName:string,
    DeleteTodo:ActionCreator<DeleteTodoType>,
    setTodoId:(a:number | null)=>void,
    ChangeStatus:ActionCreator<ChangeStatusType>
}

const DragDropWithFilter:React.FC<Props> = ({currentProject, TodoId, pathName, DeleteTodo, setTodoId, ChangeStatus}) =>{

    let filteredResult = currentProject.Todo
    const [filterTitle, setFilterTitle] = useState('')
    const [filterId, setFilterId] = useState<string | number>('')

    if (filterTitle) filteredResult = (filteredResult.filter(todo => {
        return todo.title.includes(filterTitle)
    }))

    if (filterId) filteredResult = (filteredResult.filter(todo => {
        return todo.id === +filterId
    }))

    return (
        <>
            <div className={c.TodoPage__filterTodo}>
                <input value={filterId} onChange={(e) => setFilterId(Number(e.target.value))} placeholder={'id'}
                       type={'number'}/>
                <input value={filterTitle} onChange={(e) => setFilterTitle(e.target.value)} placeholder={'title'}/>
            </div>

            <DragDrop TodoId={TodoId} pathName={pathName} DeleteTodo={DeleteTodo} svg={svg} setTodoId={setTodoId}
                      ChangeStatus={ChangeStatus} filteredResult={filteredResult} currentProject={currentProject}/>
        </>)
}

export default React.memo(DragDropWithFilter)