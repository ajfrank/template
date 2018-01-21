import React, {Component} from 'react'
import {connect} from 'react-redux'
import store, {
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

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    store.dispatch(fetchUsers())
    store.dispatch(fetchGroups())
  }

  handleChange (e, idx, value) {
    console.log(value)
    store.dispatch(fetchGroup(value))
  }

  render () {
    const {users, groups} = this.props

    if (!users.length) return (<div>Loading...</div>)

    return (
      <div>
        <h2>Add User to Group</h2>
        <SelectField
          floatingLabelText="Select Group"
          value={this.props.group.id}
          onChange={this.handleChange}
        >
          {groups.map(group => <MenuItem value={group.id} primaryText={group.name} key={group.id}/>)}
        </SelectField>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = ({users, groups, group}) => {
  return {
    users,
    groups,
    group
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(AddUser)
