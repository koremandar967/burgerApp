export const updateObject = (oldState, updatedObj) => {
    return {
        ...oldState,
        ...updatedObj
    }
}