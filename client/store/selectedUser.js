import axios from 'axios'

// action types
const GET_SELECTED_USER = 'GET_SELECTED_USER'

// action creators

export function getSelectedUser (user) {
  return {type: GET_SELECTED_USER, user}
}

// thunk creators
export function fetchSelectedUser (id) {
  return function thunk (dispatch) {
    return axios.get(`/api/users/${id}`)
      .then(res => dispatch(getSelectedUser(res.data)))
      .catch(err => console.error(err))
  }
}

// reducer
export default function user (selectedUser = {}, action) {
  switch (action.type) {
    case GET_SELECTED_USER:
      return action.user
    default:
      return selectedUser
  }
}
