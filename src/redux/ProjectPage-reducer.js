

const CREATE_PROJECT = 'CREATE-PROJECT'

let initialState = {
    ProjectData: [{
        id: 1,
        title: 'First project',
    },
    ],
}
const projectPageReducer = (state = initialState, action) => {
    switch (action.type) {

        case CREATE_PROJECT:

            return {
                ...state,
                ProjectData: [...state.ProjectData, {
                    id: action.id,
                    title:action.title
                }]
            }


        default:
            return state
    }
}

export let ProjectCreator = (title, id) => ({
    type: CREATE_PROJECT,
    id: id,
    title: title,
})

export default projectPageReducer