// this is the skip stepper action for handing the stepper redux state
export const stepper = (data: any) => {
    const dataItem = data || {}
    return {
        type: dataItem.type,
        payload: dataItem.payload
    }
}