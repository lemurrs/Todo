import React, {useState} from 'react'
import c from "./TodoPage.module.less";
import moment from "moment";
import svg from '../../../common/svg/symbol-defs.svg'





function TodoInfo({
                      ActiveTodo = {
                          id: 0,
                          title: 'Todo',
                          description: 'cook egg',
                          priority: 'Important',
                          created: 'today',
                          deadLine: 'Tomorrow',
                          status: 'Queued',
                          extraTasks: []
                      }
                  ,ChangeTodo,pathName}) {
    const [change, setChange] = useState(false)


    const TodoInfoForm = ({ChangeTodo}) => {
        const [title,setTitle]=useState(ActiveTodo.title)
        const [description,setDescription]=useState(ActiveTodo.description)
        const [priority,setPriority]=useState(ActiveTodo.priority)
        const [DateDays, setDateDays] = useState('')
        const [DateHours, setDateHours] = useState('')
        const [DateMinutes, setDateMinutes] = useState('')
        return <form className={c.InfoForm} onSubmit={(e) => {
            e.preventDefault();
            const priority = document.getElementById('priority').value
            const deadLine = moment().add(DateDays, 'days').add(DateHours, 'hours').add(DateMinutes, 'minutes').format("MMMM Do YYYY, h:mm:ss a")
            ChangeTodo(pathName, ActiveTodo.id, e.target[0].value, e.target[1].value, priority, deadLine)
            setChange(false)
        }}
        >
            <p><b>Title: </b><input type={'text'} value={title} onChange={e => setTitle(e.target.value)}/></p>
            <p><b>Description: </b><input type={'text'} value={description} onChange={e => setDescription(e.target.value)}/></p>
            <p><b>Priority: </b><br/><select id="priority" value={priority} onChange={e => setPriority(e.target.value)}>
                <option value={''} label="Priority: "/>
                <option value={'Urgent and important'} label="Urgent and important"/>
                <option value={'Urgent'} label="Urgent"/>
                <option value={'Important'} label="Important"/>
                <option value={'Not urgent and not important'} label="Not urgent and not important"/>
            </select></p>
            <p><b>Dead line: </b>
                <input type={"number"} placeholder={'Days'} min={0} value={DateDays} onChange={(e) => {
                    setDateDays(e.target.value)
                }}/>
                <input type={"number"} placeholder={'Hours'} min={0} value={DateHours} onChange={(e) => {
                    setDateHours(e.target.value)
                }}/>
                <input type={"number"} placeholder={'Minutes'} min={0} value={DateMinutes} onChange={(e) => {
                    setDateMinutes(e.target.value)
                }}/>
            </p>
            <button disabled={(!DateDays && !DateHours && !DateMinutes) || !priority}>Save</button>
        </form>
    }
    let BorderColor
    switch (ActiveTodo.priority) {

        case "Urgent and important": {
            BorderColor = 'red'
            break;
        }
        case "Urgent": {
            BorderColor = 'orange'
            break;
        }
        case "Important": {
            BorderColor = 'green'
            break;
        }
        case "Not urgent and not important": {
            BorderColor = 'blue'
            break;
        }
        default: {
            BorderColor = 'black'
            break;
        }

    }

    return (<>
        { !change? <div className={c.Project} style={{borderColor: BorderColor}}>
             <p><b>Number: </b>{ActiveTodo.id}</p>
            <p><b>Title: </b>{ActiveTodo.title}</p>
            <p><b>Description: </b>{ActiveTodo.description}</p>
            <p><b>Priority: </b> {ActiveTodo.priority}</p>
            <p><b>Created: </b>{ActiveTodo.created}</p>
            <p><b>Dead line: </b>{ActiveTodo.deadLine}</p>
            <p><b>Status: </b> {ActiveTodo.status} </p>
        </div> :
        <TodoInfoForm ChangeTodo={ChangeTodo}/>
        }

        {!change && <svg className={c.infoSvg}>
            <use   xlinkHref={svg+'#icon-cogs'} onClick={()=>{setChange(true)}}/>
        </svg>}
    </>)
}

export default React.memo(TodoInfo)