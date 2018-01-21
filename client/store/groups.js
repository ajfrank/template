import axios from 'axios'

// action types
const GET_GROUPS = 'GET_GROUPS'

// action creators
export function getGroups (groups) {
  return { type: GET_GROUPS, groups }
}

// helper functions

function fetchAllGroups (dispatch) {
  return axios
    .get('/api/groups')
    .then(res => dispatch(getGroups(res.data)))
    .catch(err => console.error(err))
}

// thunk creators
export function fetchGroups () {
  return function thunk (dispatch) {
    return fetchAllGroups(dispatch)
  }
}

export function createGroup (group) {
  return function thunk (dispatch) {
    return axios
      .post(`/api/groups/${group}`)
      .then(() => fetchAllGroups(dispatch))
      .catch(err => console.error(err))
  }
}

export function deleteGroup (id) {
  return function thunk (dispatch) {
    return axios
      .delete(`/api/groups/${id}`)
      .then(() => fetchAllGroups(dispatch))
      .catch(err => console.error(err))
  }
}

// reducer
export default function groups (groups = [], action) {
  switch (action.type) {
    case GET_GROUPS:
      return action.groups
    default:
      return groups
  }
}
