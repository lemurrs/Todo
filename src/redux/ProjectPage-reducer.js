const CREATE_PROJECT = 'CREATE-PROJECT'
const SET_TODO = 'SET-TODO'
const CHANGE_STATUS = 'CHANGE-STATUS'
let initialState = {
    ProjectData: [{
        name: 'FirstProject',
        Todo: [],
    },
    ],
}
const projectPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODO:
            return {
                ...state, ProjectData: state.ProjectData.map(el => {
                        if (el.name !== action.name) return el
                        return {
                            ...el,
                            Todo: [...el.Todo,
                                {
                                    id: action.id,
                                    title: action.title,
                                    description: action.description,
                                    priority: action.priority,
                                    created: action.created,
                                    deadLine: action.deadLine,
                                    status: action.status
                                }

                            ]
                        }
                    }
                )


            }
        case CREATE_PROJECT:
            return {
                ...state,
                ProjectData: [...state.ProjectData, {
                    name: action.name,
                    Todo: [],
                }]
            }
        case CHANGE_STATUS:
            return {
                ...state, ProjectData: state.ProjectData.map(el => {
                    if (el.name !== action.name) {
                        return el
                    }
                    return {
                        ...el,
                        Todo: el.Todo.map(el => {
                            if (el.id !== action.id) {
                                return el
                            }
                            return {
                                ...el,
                                status: action.status
                            }
                        })

                    }
                })
            }
        default:
            return state
    }
}
export let SetTodoCreator = (name, id, title, description, priority, created, deadLine) => ({
    type: SET_TODO,
    name: name,
    id: id,
    title: title,
    description: description,
    priority: priority,
    created: created,
    deadLine: deadLine,
    status: 'Queue'
})
export let ProjectCreator = (name) => ({
    type: CREATE_PROJECT,
    name: name,
})
export let ChangeStatus = (name, id, status) => ({
    type: CHANGE_STATUS,
    name: name,
    id: id,
    status: status

})

export default projectPageReducer