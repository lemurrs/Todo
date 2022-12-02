import React, {useState} from "react";
import c from "../TodoPage.module.less";
import DragDrop from "./DragDrop/DragDrop";
import svg from "../../../../common/svg/symbol-defs.svg";


function DragDropWithFilter({currentProject, TodoId, pathName, DeleteTodo, setTodoId, ChangeStatus}) {

    let filteredResult = currentProject.Todo
    const [filterTitle, setFilterTitle] = useState('')
    const [filterId, setFilterId] = useState('')

    if (filterTitle) filteredResult = (filteredResult.filter(todo => {
        return todo.title.includes(filterTitle)
    }))

    if (filterId) filteredResult = (filteredResult.filter(todo => {
        return todo.id === filterId
    }))

    return (
        <>
            <div className={c.TodoPage__filterTodo}>
                <input value={filterId} onChange={(e) => setFilterId(+e.target.value)} placeholder={'id'}
                       type={'number'}/>
                <input value={filterTitle} onChange={(e) => setFilterTitle(e.target.value)} placeholder={'title'}/>
            </div>

            <DragDrop TodoId={TodoId} pathName={pathName} DeleteTodo={DeleteTodo} svg={svg} setTodoId={setTodoId}
                      ChangeStatus={ChangeStatus} filteredResult={filteredResult} currentProject={currentProject}/>
        </>)
}

export default React.memo(DragDropWithFilter)