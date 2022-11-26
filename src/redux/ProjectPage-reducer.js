
const CREATE_PROJECT = 'CREATE-PROJECT'
const SET_TODO = 'SET-TODO'
const CHANGE_STATUS = 'CHANGE-STATUS'
const CHANGE_TODO='CHANGE-TODO'
const ADD_EXTRA='ADD-EXTRA'
const ADD_COMMENT='ADD-COMMENT'
const SAVE_REPLY='SAVE-REPLY'
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
                                    status: action.status,
                                    extraTasks: action.extraTasks,
                                    comments:action.comments,
                                    replys:action.replys
                                }

                            ]
                        }
                    }
                )


            }
        case SAVE_REPLY:
            return {
                ...state,ProjectData: state.ProjectData.map(el => {
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
                                replys:[...el.replys, {
                                    id:action.replyId,
                                    text:action.reply
                                }]
                            }
                        })
                    }
                })
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
                            return {
                                ...el,
                                extraTasks:[...el.extraTasks,action.extra]
                            }
                        })
                    }
                })

            }
        case ADD_COMMENT:{
            return {
                ...state,ProjectData: state.ProjectData.map(el => {
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
                                comments:[...el.comments,{
                                    id:action.commentId,
                                    text:action.text,
                                }]

                            }
                        })
                    }
            })

        }}
        // case ADD_COMMENT:{
        //     return {
        //         ...state,ProjectData: state.ProjectData.map(el => {
        //             if (el.name !== action.name) {
        //                 return el
        //             }
        //             return {
        //                 ...el,
        //                 Todo: el.Todo.map(el => {
        //                     if (el.id !== action.id) {
        //                         return el
        //                     }
        //                     return {
        //                         ...el,
        //                         comments:[...el.comments,{
        //                             id:action.commentId,
        //                             text:action.text,
        //                         }]
        //
        //                     }
        //                 })
        //             }
        //         })
        //
        //     }}


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
export let saveReply=(name,id,replyId,reply)=>({
    type:SAVE_REPLY,
    name:name,
    id:id,
    replyId:replyId,
    reply:reply,

})
export let addCommentCreator=(name,id,commentId,text)=>({
    type: ADD_COMMENT,
    name:name,
    id:id,
    commentId:commentId,
    text:text

})
export let SetTodoCreator = (name, id, title, description, priority, created, deadLine) => ({
    type: SET_TODO,
    name: name,
    id: id,
    title: title,
    description: description,
    priority: priority,
    created: created,
    deadLine: deadLine,
    status: 'Queue',
    extraTasks:[],
    comments:[],
    replys:[],
})
export let AddExtraTask=(name,id,extra)=>({
    type: ADD_EXTRA,
    extra:extra,
    name:name,
    id:id,
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
export let ChangeTodo=(name,id,title,description,priority,deadLine)=>({
    type:CHANGE_TODO,
    name:name,
    id:id,
    title:title,
    description:description,
    priority:priority,
    deadLine:deadLine
})

export default projectPageReducer