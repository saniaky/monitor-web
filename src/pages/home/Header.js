import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

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

  const guestLinks = (
    <>
      <Button
        to='/login'
        component={RouterLink}
        color='primary' variant='outlined'
      >
        Login
      </Button>
    </>
  )

  const accountButton = (
    <>
      <Button
        to='/dashboard'
        component={RouterLink}
        color='primary' variant='outlined' className={classes.link}
      >
        Account
      </Button>
      <Button
        onClick={() => auth.logout()}
        color='primary' variant='outlined'
      >
        Logout
      </Button>
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
