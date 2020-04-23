import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useHistory } from 'react-router'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none'
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: 'wrap'
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700]
  }
}))

export default () => {
  const classes = useStyles()
  const auth = useAuth()
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null)

  const guestLinks = (
    <>
      <Button color='inherit' onClick={() => history.push('/login')}>
        Login
      </Button>
    </>
  )

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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

  const accountButton = (
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={dashboard}>Dashboard</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  )

  return (
    <AppBar position='static' elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography component='h1' variant='h6' color='inherit' noWrap className={classes.toolbarTitle}>
          Monitor
        </Typography>
        <nav>
          <Link variant='button' to='/pricing' component={RouterLink} className={classes.link}>
            Pricing
          </Link>
        </nav>
        {auth.user ? accountButton : guestLinks}
      </Toolbar>
    </AppBar>
  )
}
