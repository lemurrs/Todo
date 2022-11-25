

const CREATE_TODO = 'CREATE-TODO'
const CHANGE_STATUS='CHANGE-STATUS'

let initialState = {
    id:1,
    Todo:[]
}
const todoPageReducer = (state = initialState, action) => {
    switch (action.type) {

        case CREATE_TODO:
            return {
                ...state,
                Todo: [...state.Todo, {
                    id: action.id,
                    title: action.title,
                    description: action.description,
                    priority: action.priority,
                    created: action.created,
                    deadLine: action.deadLine,
                    status: action.status
                }],
                id:action.projectId
            }
        case CHANGE_STATUS:

            return {
                ...state,
                Todo: state.Todo.map(todo => {
                    if (todo.id !== action.id) {
                        return todo
                    }
                    return {
                        ...todo,
                        status: action.status
                    }
                })
            }




        default:
            return state
    }
}

export let TodoCreator = (title, description, id, priority, created, deadLine,projectId) => ({
    type: CREATE_TODO,
    id: id,
    title: title,
    description: description,
    priority: priority,
    created: created,
    deadLine: deadLine,
    status: 'Queue',
    projectId:projectId
})
export let ChangeStatusCreator=(id,status)=>({
    type: CHANGE_STATUS,
    id:id,
    status:status
})


export default todoPageReducer