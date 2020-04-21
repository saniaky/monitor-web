import React from 'react'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import DrawerMenu from './DrawerMenu'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: '#132348',
    color: 'white',
    position: 'relative'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  }
}))

export default ({ drawerOpen, handleDrawerToggle }) => {
  const classes = useStyles()

  return (
    <>
      {/* Mobile */}
      <Hidden smUp>
        <Drawer
          variant='temporary'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen
            })
          }}
        >
          <DrawerMenu handleToggle={handleDrawerToggle} />
        </Drawer>
      </Hidden>

      {/* Desktop */}
      <Hidden xsDown>
        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen
            })
          }}
        >
          <DrawerMenu handleToggle={handleDrawerToggle} />
        </Drawer>
      </Hidden>
    </>
  )
}
