import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useHistory } from 'react-router'
import { useAuth } from '../hooks/useAuth'

export default () => {
  const auth = useAuth()
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const profile = () => {
    history.push('/dashboard/profile')
    handleClose()
  }

  const dashboard = () => {
    history.push('/dashboard')
    handleClose()
  }

  const logout = () => {
    history.push('/')
    auth.logout()
    handleClose()
  }

  return (
    <>
      <Button onClick={handleClick} color='inherit'>
        <AccountCircleIcon /> &nbsp; Account
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={profile}>Profile</MenuItem>
        <MenuItem onClick={dashboard}>Dashboard</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  )
}
