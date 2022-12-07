import React, {useState} from "react";
import moment from "moment";
import c from "../TodoPage.module.less";
import FileUploader from "../../../../Components/FileUploader/FileUploader";
import {ActionCreator} from "redux";
import {SetTodoCreatorType} from "../../../../Types";
import {Project} from "../../../../Interfaces";
type Props={
    SetTodoCreator:ActionCreator<SetTodoCreatorType>,
    pathName:string,
    setActiveModal:(a:boolean)=>void,
    currentProject:Project
}
function ModalForm({SetTodoCreator, pathName, setActiveModal, currentProject}:Props) {

    const [title, setTitle] = useState('')
    const [description, setDescr] = useState('')
    const [DateDays, setDateDays] = useState('')
    const [DateHours, setDateHours] = useState('')
    const [DateMinutes, setDateMinutes] = useState('')
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
    const [TodoLength, setTodoLenght] = useState(currentProject.Todo.length + 1 || 1)

    function HandleSubmit(e:React.FormEvent) {
        e.preventDefault()

        //values needed to create todo
        const priority = (document.getElementById('priority') as HTMLInputElement).value
        const created = moment().format('MMMM Do YYYY, h:mm:ss a');
        const deadLine = moment().add(DateDays, 'days').add(DateHours, 'hours').add(DateMinutes, 'minutes').format("MMMM Do YYYY, h:mm:ss a")

        //SetTodoCreator ->ActionCreator to dispatch todo, setTodoLength -> id
        SetTodoCreator(pathName, TodoLength, title, description, priority, created, deadLine, uploadedFiles)
        setTodoLenght(TodoLength + 1)
        setActiveModal(false)

        //set Default value

        setTitle('')
        setDescr('')
        setDateMinutes('')
        setDateHours('')
        setDateDays('')

        setUploadedFiles([])
       // (document.getElementById('priority') as HTMLInputElement).value=''


    }

    return (
        <form className={c.TodoPage__modal} onSubmit={(e) => HandleSubmit(e)}>
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
                <option value={'Important'} label="Important"/>
                <option value={'Not urgent and not important'} label="Not urgent and not important"/>
            </select>
            <div className={c.FormDate}>
                <h5>Deadline</h5>
                <input type={"number"} placeholder={'dd'} min={0} value={DateDays} onChange={(e) => {
                    setDateDays(e.target.value)
                }}/>
                <input type={"number"} placeholder={'hh'} min={0} value={DateHours} onChange={(e) => {
                    setDateHours(e.target.value)
                }}/>
                <input type={"number"} placeholder={'mm'} min={0} value={DateMinutes} onChange={(e) => {
                    setDateMinutes(e.target.value)
                }}/>
            </div>
            <FileUploader uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}/>

            <button
                disabled={(!DateDays && !DateHours && !DateMinutes) || (!title && !description && !(document.getElementById('priority') as HTMLInputElement).value)}>Save
            </button>
        </form>
    )
}

export default React.memo(ModalForm)