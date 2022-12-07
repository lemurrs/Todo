import React, {useEffect, useState} from 'react'
import c from "../../../TodoPage.module.less";
import moment from "moment";
import svg from '../../../../../../common/svg/symbol-defs.svg'
import {ITodo} from "../../../../../../Interfaces";
import {ActionCreator} from "redux";
import {ChangeTodoType} from "../../../../../../Types";
import Time from "../../../../../../common/TimerLogic/TimerLogic";

type Props={
    ActiveTodo:ITodo,
    pathName:string,
    ChangeTodo:ActionCreator<ChangeTodoType>,
    TodoId:number
}

const TodoInfo:React.FC<Props>=({ActiveTodo, ChangeTodo, pathName,TodoId}) =>{
    const [change, setChange] = useState(false)
    const [duration,setDuration]=useState<{hours:number|string,minutes:number|string,seconds:number|string}>()
     useEffect(()=>{
         let interval:any;
         if(!change){
             interval = setInterval(()=>{
                 setDuration(Time(Math.floor(moment.duration(moment().diff(moment(ActiveTodo.created,'MMMM Do YYYY, h:mm:ss a'))).asSeconds())))
             },1000)
         }
        return ()=>clearInterval(interval)
    },[ActiveTodo,change])


    const TodoInfoForm = ({ChangeTodo}:{ChangeTodo:ActionCreator<ChangeTodoType>}) => {
        const [title, setTitle] = useState(ActiveTodo.title)
        const [description, setDescription] = useState(ActiveTodo.description)
        const [priority, setPriority] = useState(ActiveTodo.priority)
        const [DateDays, setDateDays] = useState('')
        const [DateHours, setDateHours] = useState('')
        const [DateMinutes, setDateMinutes] = useState('')
        return <form className={c.InfoForm} onSubmit={(e) => {
            e.preventDefault();
            const deadLine = moment().add(DateDays, 'days').add(DateHours, 'hours').add(DateMinutes, 'minutes').format("MMMM Do YYYY, h:mm:ss a")
            ChangeTodo(pathName, ActiveTodo.id, ((e.target as HTMLFormElement)[0] as HTMLInputElement).value, ((e.target as HTMLFormElement)[1] as HTMLInputElement).value, priority, deadLine)
            setChange(false)
        }}
        >
            <b>Title: </b><input type={'text'} value={title} onChange={e => setTitle(e.target.value)}/>
            <b>Description: </b><input type={'text'} value={description}
                                          onChange={e => setDescription(e.target.value)}/>
            <b>Priority: </b><br/><select id="priority" value={priority} onChange={e => setPriority(e.target.value)}>
                <option value={''} label="Priority: "/>
                <option value={'Urgent and important'} label="Urgent and important"/>
                <option value={'Urgent'} label="Urgent"/>
                <option value={'Important'} label="Important"/>
                <option value={'Not urgent and not important'} label="Not urgent and not important"/>
            </select>
            <b>Dead line: </b>
                <input type={"number"} placeholder={'Days'} min={0} value={DateDays} onChange={(e) => {
                    setDateDays(e.target.value)
                }}/>
                <input type={"number"} placeholder={'Hours'} min={0} value={DateHours} onChange={(e) => {
                    setDateHours(e.target.value)
                }}/>
                <input type={"number"} placeholder={'Minutes'} min={0} value={DateMinutes} onChange={(e) => {
                    setDateMinutes(e.target.value)
                }}/>

            <button disabled={(!DateDays && !DateHours && !DateMinutes) || !priority}>Save</button>
        </form>
    }

    return (<>
        {!change ? <div  className={c.Project}>
                <p> <b>Number: </b>{ActiveTodo.id}</p>
                <p><b>Title: </b>{ActiveTodo.title}</p>
                <p><b>Description: </b>{ActiveTodo.description}</p>
                <p><b>Priority: </b> {ActiveTodo.priority}</p>
                <p><b>Created: </b>{ActiveTodo.created.toString()}</p>
                <p><b>Dead line: </b>{ActiveTodo.deadLine.toString()}</p>
                <p><b>Status: </b> {ActiveTodo.status} </p>
                <p><b>In progress: </b>{duration?.hours}:{duration?.minutes}:{duration?.seconds}</p>
                <b>Uploaded files: </b>
                    <div className={c.fileUploader__fileName}>
                        {TodoId && ActiveTodo.files.map(file => {
                            let objectURL:string | undefined;
                            try{
                                objectURL = URL.createObjectURL(file);
                            }catch (e) {
                                objectURL=undefined;
                            }


                            return (
                                <a style={{color:'white'}} href={objectURL} download={file.name}>{file.name}</a>
                            )
                        })}
                    </div>

            </div> :
            <TodoInfoForm ChangeTodo={ChangeTodo}/>

        }

        {!change && <svg className={c.infoSvg} >
            <use onClick={() => {
                setChange(true)
            }} xlinkHref={svg + '#icon-cogs'} />
        </svg>}
    </>)
}

export default React.memo(TodoInfo)