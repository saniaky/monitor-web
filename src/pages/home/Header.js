import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useHistory } from 'react-router'

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
      <Button
        to='/login'
        component={RouterLink}
        // color='primary' variant='outlined'
      >
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
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Account
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
    <AppBar position='static' color='default' elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h6' color='inherit' noWrap className={classes.toolbarTitle}>
          <Link to='/' component={RouterLink}>Monitor</Link>
        </Typography>
        <nav>
          <Link variant='button' color='textPrimary' href='#' className={classes.link}>
            Features
          </Link>
          <Link variant='button' color='textPrimary' to='/pricing' component={RouterLink} className={classes.link}>
            Pricing
          </Link>
          <Link variant='button' color='textPrimary' href='#' className={classes.link}>
            Support
          </Link>
        </nav>
        {auth.user ? accountButton : guestLinks}
      </Toolbar>
    </AppBar>
  )
}
