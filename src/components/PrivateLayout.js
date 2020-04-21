import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import clsx from 'clsx'
import Container from '@material-ui/core/Container'
import MyDrawer from './MyDrawer'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    padding: theme.spacing(3)
  }
}))

export default ({ children }) => {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(true)

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}>
        <Toolbar>
          <IconButton
            edge='start'
            onClick={handleDrawerToggle}
            className={clsx(classes.menuButton, drawerOpen && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Monitor
          </Typography>
        </Toolbar>
      </AppBar>

      <MyDrawer drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth='lg' className={classes.container}>
          {children}
        </Container>
      </main>
    </div>
  )
}
