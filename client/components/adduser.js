import React, {Component} from 'react'
import {connect} from 'react-redux'
import store, {
  fetchSelectedUser,
  fetchUsers,
  fetchGroups,
  fetchGroup
} from '../store'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

/**
 * COMPONENT
 */
class AddUser extends Component {
  constructor (props) {
    super(props)

    this.handleGroupChange = this.handleGroupChange.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
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

  render () {
    const {selectedUser, users, group, groups} = this.props

    if (!users.length) return (<div>Loading...</div>)

    return (
      <div>
        <h2>Add User to Group</h2>
        <SelectField
          floatingLabelText="Select Group"
          value={group.id}
          onChange={this.handleGroupChange}
        >
          {groups.map(g => <MenuItem value={g.id} primaryText={g.name} key={g.id}/>)}
        </SelectField>
        <br/>
        <SelectField
          floatingLabelText="Select User"
          value={selectedUser.id}
          onChange={this.handleUserChange}
        >
          {users.map(u => <MenuItem value={u.id} primaryText={u.email} key={u.id}/>)}
        </SelectField>
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
