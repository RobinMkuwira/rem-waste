// this is the skip reducer for handing the current step redux state
// so that the current and previously selected steps are properly marked in the UI
const initialState: any = {}
const stepper = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_STEPPER':
            return { ...state, ...action }
        case 'UNSET_STEPPER':
            return { type: 'UNSET_STEPPER', payload: 0 }
        default:
            return state
    }
}
export default stepper