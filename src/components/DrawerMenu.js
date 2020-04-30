import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import FolderOpenIcon from '@material-ui/icons/FolderOpen'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Typography from '@material-ui/core/Typography'
import NewProjectDialog from './NewProjectDialog'
import { useRouteMatch } from 'react-router'
import ReportProblemIcon from '@material-ui/icons/ReportProblem'
import LanguageIcon from '@material-ui/icons/Language'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useRouter } from '../hooks/useRouter'
import { useProjectService } from '../pages/dashboard/ProjectContext'
import SettingsIcon from '@material-ui/icons/Settings'
import GroupIcon from '@material-ui/icons/Group'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  }
}))

export default ({ handleToggle }) => {
  const classes = useStyles()
  const router = useRouter()
  const { path } = useRouteMatch()
  const [newProjectOpen, setNewProjectOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const projectService = useProjectService()
  const currentProject = projectService.project
  const projects = projectService.projects

  const menu = [
    { text: 'Incidents', pathname: `${path}/incidents`, Icon: ReportProblemIcon },
    // { text: 'Components', pathname: 'components', Icon: AppsIcon },
    { text: 'Members', pathname: `${path}/members`, Icon: GroupIcon },
    // { text: 'Subscribers', pathname: 'subscribers', Icon: MailOutlineIcon },
    { text: 'Your page', pathname: `/status-page/${currentProject.projectId}`, Icon: LanguageIcon, newTab: true },
    // { text: 'Activity log', pathname: 'activity-log', Icon: HistoryIcon },
    { text: 'Project settings', pathname: `${path}/settings`, Icon: SettingsIcon }
  ]

  const handleProjectClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProjectChangeClick = (event, projectId) => {
    projectService.changeProject(projectId)
    setAnchorEl(null)
  }

  const handleCloseProjectMenu = () => {
    setAnchorEl(null)
  }

  const handleNewProjectClick = () => {
    setNewProjectOpen(true)
    handleCloseProjectMenu()
  }

  const projectsMenuPopup = (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleCloseProjectMenu}
    >
      {projects.map(project => (
        <MenuItem
          key={project.projectId}
          selected={project.projectId === currentProject.projectId}
          onClick={(e) => handleProjectChangeClick(e, project.projectId)}
        >
          {project.name}
        </MenuItem>
      ))}
      <Divider />
      <MenuItem onClick={handleNewProjectClick}>
        <ListItemIcon><AddCircleOutlineIcon fontSize='small' /></ListItemIcon>
        <Typography variant='inherit' noWrap>Create new project</Typography>
      </MenuItem>
      <NewProjectDialog
        open={newProjectOpen}
        handleSave={() => {
          projectService.refreshProject()
          setNewProjectOpen(false)
        }}
        handleClose={() => setNewProjectOpen(false)}
      />
    </Menu>
  )

  return (
    <>
      <div className={classes.toolbar}>
        <IconButton onClick={handleToggle}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button onClick={handleProjectClick}>
          <ListItemIcon><FolderOpenIcon /></ListItemIcon>
          <ListItemText primary={currentProject.name} secondary='Current project' />
        </ListItem>
      </List>
      {projectsMenuPopup}
      <Divider />
      <List>
        {menu.map(({ text, pathname, Icon }) => (
          <ListItem
            key={pathname}
            button
            onClick={() => router.push(`${pathname}`)}
            selected={pathname === router.pathname}
          >
            <ListItemIcon><Icon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => router.push(`${path}/profile`)}>
          <ListItemIcon><AccountCircleIcon /></ListItemIcon>
          <ListItemText primary='Profile' secondary='My personal profile' />
        </ListItem>
      </List>
    </>
  )
}
