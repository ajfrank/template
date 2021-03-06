import axios from 'axios'

// action types
const GET_USERS = 'GET_USERS'

// action creators
export function getUsers (users) {
  return { type: GET_USERS, users }
}

// helper functions

function fetchAllUsers (dispatch) {
  return axios
    .get('/api/users')
    .then(res => dispatch(getUsers(res.data)))
    .catch(err => console.error(err))
}

// thunk creators
export function fetchUsers () {
  return function thunk (dispatch) {
    return fetchAllUsers(dispatch)
  }
}

export function updateUser (id, groupId) {
  return function thunk (dispatch) {
    return axios
      .put(`/api/users/${id}/${groupId}`)
      .then(() => fetchAllUsers(dispatch))
      .catch(err => console.error(err))
  }
}

// reducer
export default function users (users = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return users
  }
}
