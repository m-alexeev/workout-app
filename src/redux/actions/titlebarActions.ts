export const OPEN_MODAL = "OPEN_MODAL"
export const CLOSE_MODAL = "CLOSE_MODAL"

export const closeModal = action: boolean => dispatch => {
  dispatch({
    type: OPEN_MODAL, 
    payload: action,
  })
}