// this is the skip action for handing the skip redux state
export const skip = (data: any) => {
    const dataItem = data || {}
    return {
        type: dataItem.type,
        payload: dataItem.payload
    }
}