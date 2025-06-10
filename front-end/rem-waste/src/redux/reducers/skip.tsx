// this is the skip reducer for handing the selected skip redux state
const initialState: any = {}
const navbar = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_SKIP':
            return { ...state, ...action }
        case 'UNSET_SKIP':
            return { type: 'UNSET_SKIP', payload: {} }
        default:
            return state
    }
}
export default navbar