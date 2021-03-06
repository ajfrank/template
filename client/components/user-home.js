import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AddUser from './adduser'
import Group from './group'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props

  return (
    <div>
      <h2>Welcome, {email}</h2>
      <AddUser/>
      <Group/>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
