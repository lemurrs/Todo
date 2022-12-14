import {Project, ITodo, ExtraTask, IComments} from "../Interfaces";
import {
    ActionTypes,
    addCommentCreatorType, AddExtraTaskType, ChangeStatusType,
    ChangeTodoType,
    DeleteTodoType,
    ProjectCreatorType,
    SetExtraAsDoneCreatorType, SetTodoCreatorType
} from "../Types";

export const CREATE_PROJECT = 'CREATE-PROJECT'
export const SET_TODO = 'SET-TODO'
export const CHANGE_STATUS = 'CHANGE-STATUS'
export const CHANGE_TODO = 'CHANGE-TODO'
export const ADD_EXTRA = 'ADD-EXTRA'
export const ADD_COMMENT = 'ADD-COMMENT'
export const SET_EXTRA_AS_DONE = 'SET-EXTRA-AS-DONE'
export const DELETE_TODO = 'DELETE-TODO'

let initialState = {
    ProjectData: [] as Array<Project>
}
export type InitialStateType = typeof initialState

function idGenerator<T>(arr:Array<T & { id: number }>):number{
    return arr.length>0 ? arr[arr.length - 1].id + 1 : 1
}

const projectPageReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {

        case SET_TODO:
            return {
                ...state, ProjectData: state.ProjectData.map(el => {
                        if (el.name !== action.name) return el
                    const id = idGenerator<ITodo>(el.Todo)
                        return {
                            ...el,
                            Todo: [...el.Todo,
                                {
                                    id: id,
                                    title: action.title,
                                    description: action.description,
                                    priority: action.priority,
                                    created: action.created,
                                    deadLine: action.deadLine,
                                    status: action.status,
                                    extraTasks: action.extraTasks,
                                    comments: action.comments,
                                    files: action.files
                                }

                            ] as ITodo[]
                        }
                    }
                )


            }
        case SET_EXTRA_AS_DONE:
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
                                extraTasks: el.extraTasks.map(task => {
                                    if (task.id !== action.taskId) {
                                        return task
                                    }
                                    return {
                                        ...task,
                                        status: 'Done'
                                    }
                                })
                            }
                        })
                    }
                })

            }
        case DELETE_TODO:
            return {
                ...state, ProjectData: state.ProjectData.map(project => {
                        return {
                            ...project,
                            Todo: project.Todo.filter((todo) => todo.id !== action.id)

                        }
                    }
                )
            }

        case ADD_EXTRA:
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

                            const id = idGenerator<ExtraTask>(el.extraTasks)

                            return {
                                ...el,
                                extraTasks: [...el.extraTasks,
                                    {
                                        text: action.extra,
                                        id: id,
                                        status: 'todo'
                                    }]
                            }
                        })
                    }
                })

            }
        case ADD_COMMENT: {
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

                            const id = idGenerator<IComments>(el.comments)

                            return {
                                ...el,
                                comments: [...el.comments, {
                                    id: id,
                                    text: action.text,
                                    parentId: action.parentId
                                }]

                            }
                        })
                    }
                })

            }
        }

        case CREATE_PROJECT:

            let id = idGenerator<Project>(state.ProjectData)

            return {
                ...state,
                ProjectData: [...state.ProjectData, {
                    id: id,
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
        case CHANGE_TODO:

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
                                title: action.title,
                                description: action.description,
                                priority: action.priority,
                                deadLine: action.deadLine,
                            }
                        })
                    }
                })
            }

        default:
            return state
    }
}

export let addCommentCreator = (name: string, id: number, text: string, parentId: number): addCommentCreatorType => ({
    type: ADD_COMMENT,
    name: name,
    id: id,
    text: text,
    parentId: parentId

})
export let SetExtraAsDoneCreator = (name: string, id: number, taskId: number): SetExtraAsDoneCreatorType => ({
    type: SET_EXTRA_AS_DONE,
    name: name,
    id: id,
    taskId: taskId
})

export let SetTodoCreator = (name: string, title: string, description: string, priority: string, created: Date, deadLine: Date, files: File): SetTodoCreatorType => ({
    type: SET_TODO,
    name: name,
    title: title,
    description: description,
    priority: priority,
    created: created,
    deadLine: deadLine,
    status: 'Queue',
    extraTasks: [],
    comments: [],
    files: files
})
export let AddExtraTask = (name: string, id: number, extra: string): AddExtraTaskType => ({
    type: ADD_EXTRA,
    extra: extra,
    name: name,
    id: id,
})
export let ProjectCreator = (name: string): ProjectCreatorType => ({
    type: CREATE_PROJECT,
    name: name,
})
export let ChangeStatus = (name: string, id: number, status: string): ChangeStatusType => ({
    type: CHANGE_STATUS,
    name: name,
    id: id,
    status: status

})
export let DeleteTodo = (name: string, id: number): DeleteTodoType => ({
    type: DELETE_TODO,
    name: name,
    id: id,
})

export let ChangeTodo = (name: string, id: number, title: string, description: string, priority: string, deadLine: Date): ChangeTodoType => ({
    type: CHANGE_TODO,
    name: name,
    id: id,
    title: title,
    description: description,
    priority: priority,
    deadLine: deadLine,
})

export default projectPageReducer