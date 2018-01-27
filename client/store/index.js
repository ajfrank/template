import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import selectedUser from './selectedUser'
import users from './users'
import group from './group'
import groups from './groups'

const reducer = combineReducers({user, selectedUser, users, group, groups})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './selectedUser'
export * from './users'
export * from './group'
export * from './groups'
