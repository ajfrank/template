import React, {Component} from 'react'
import {connect} from 'react-redux'
import store, {
  fetchSelectedUser,
  fetchUsers,
  fetchGroups,
  fetchGroup,
  updateUser
} from '../store'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

/**
 * COMPONENT
 */
class AddUser extends Component {
  constructor (props) {
    super(props)

    this.handleGroupChange = this.handleGroupChange.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    store.dispatch(fetchUsers())
    store.dispatch(fetchGroups())
  }

  handleGroupChange (e, idx, value) {
    store.dispatch(fetchGroup(value))
  }

  handleUserChange (e, idx, value) {
    store.dispatch(fetchSelectedUser(value))
  }

  handleClick (e) {
    const {selectedUser, group} = this.props
    store.dispatch(updateUser(selectedUser.id, group.id))
  }

  render () {
    const {selectedUser, users, group, groups} = this.props
    const {handleGroupChange, handleUserChange, handleClick} = this

    if (!users.length) return (<div>Loading...</div>)

    return (
      <div>
        <h2>Add User to Group</h2>
        <SelectField
          floatingLabelText="Select Group"
          value={group.id}
          onChange={handleGroupChange}
        >
          {groups.map(g => <MenuItem value={g.id} primaryText={g.name} key={g.id}/>)}
        </SelectField>
        <br/>
        <SelectField
          floatingLabelText="Select User"
          value={selectedUser.id}
          onChange={handleUserChange}
        >
          {users.map(u => <MenuItem value={u.id} primaryText={u.email} key={u.id}/>)}
        </SelectField>
        <br/>
        <RaisedButton label="Add To Group" primary={true} onClick={handleClick}/>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = ({users, selectedUser, groups, group}) => {
  return {
    selectedUser,
    users,
    groups,
    group
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(AddUser)
