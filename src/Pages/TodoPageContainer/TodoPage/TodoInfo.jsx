import React from 'react'
import c from "./TodoPage.module.less";
function TodoInfo({ActiveTodo={id:0,title:'Todo',description:'cook egg', priority:'Important', created:'today',deadLine: 'Tomorrow',status:'Queued' }}){
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
        default:{
            BorderColor='black'
            break;
        }

    }

    return(<>
                <div className={c.Project} style={{borderColor: BorderColor}}>
                <p><b>Number: </b>{ActiveTodo.id}</p>
                <p><b>Title: </b>{ActiveTodo.title}</p>
                <p><b>Description: </b>{ActiveTodo.description}</p>
                <p><b>Priority: </b> {ActiveTodo.priority}</p>
                <p><b>Created: </b>{ActiveTodo.created}</p>
                <p><b>Dead line: </b>{ActiveTodo.deadLine}</p>
                <p><b>Status: </b> {ActiveTodo.status} </p>
                </div>
    </>)
}
export default React.memo(TodoInfo)