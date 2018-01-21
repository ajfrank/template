import axios from 'axios'

// action types
const GET_GROUP = 'GET_GROUP'

// action creators

export function getGroup (group) {
  return {type: GET_GROUP, group}
}

// thunk creators
export function fetchGroup (id) {
  return function thunk (dispatch) {
    return axios.get(`/api/groups/${id}`)
      .then(res => dispatch(getGroup(res.data)))
      .catch(err => console.error(err))
  }
}

// reducer
export default function group (group = {}, action) {
  switch (action.type) {
    case GET_GROUP:
      return action.group
    default:
      return group
  }
}
