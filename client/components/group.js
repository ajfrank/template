import React, {Component} from 'react'
import {connect} from 'react-redux'
import store, {
  fetchUsers,
  fetchGroups,
  fetchGroup,
  updateUser
} from '../store'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'

class Group extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: true,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: '300px'
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  handleClick(e){
    const {selectedUser, group} = this.props
    //need to get user id somehow
    //store.dispatch(updateUser(selectedUser.id, 0))
  }

  render () {
    const {users, group} = this.props

    if(!group.name) return <div/>

    const groupUsers = users.filter(user=>user.groupId===group.id)

    return (
      <div>
        <h3>{group.name}</h3>
        <h3>{groupUsers.length} Users</h3>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
         <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn> </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {groupUsers.map(u => {
              return (
                <TableRow key={u.id}>
                  <TableRowColumn selectable={false} >{u.id}</TableRowColumn>
                  <TableRowColumn selectable={false}>{u.email}</TableRowColumn>
                  <TableRowColumn selectable={false}><FlatButton label="Remove" secondary={true} onClick={this.handleClick}/></TableRowColumn>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
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

export default connect(mapState, mapDispatch)(Group)
