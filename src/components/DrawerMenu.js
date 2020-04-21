import React, { useEffect, useState } from 'react'
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
import api from '../config/api'
import ReportProblemIcon from '@material-ui/icons/ReportProblem'
import AppsIcon from '@material-ui/icons/Apps'
import GroupIcon from '@material-ui/icons/Group'
import LanguageIcon from '@material-ui/icons/Language'
import HistoryIcon from '@material-ui/icons/History'
import { makeStyles } from '@material-ui/core/styles'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import useLocalStorage from '../hooks/useLocalStorage'
import { useRouter } from '../hooks/useRouter'

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

const defaultProject = { projectId: null, name: 'Loading...' }

export default ({ handleToggle }) => {
  const classes = useStyles()
  const router = useRouter()
  const { path } = useRouteMatch()
  const [newProjectOpen, setNewProjectOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [projects, setProjects] = useState([])
  const [selectedProjectId, setSelectedProjectId] = useLocalStorage('m_current_project', null)

  const projectId = router.query.pId
  console.log(projectId)

  const menu = [
    { text: 'Incidents', pathname: 'incidents', Icon: ReportProblemIcon },
    { text: 'Components', pathname: 'components', Icon: AppsIcon },
    { text: 'Members', pathname: 'members', Icon: GroupIcon },
    { text: 'Subscribers', pathname: 'subscribers', Icon: MailOutlineIcon },
    { text: 'Your Page', pathname: 'page', Icon: LanguageIcon },
    { text: 'Activity log', pathname: 'activity-log', Icon: HistoryIcon }
  ]

  useEffect(() => {
    api.get('/me/projects')
      .then((res) => {
        setProjects(res.data)
      })
  }, [])

  useEffect(() => {
    if (selectedProjectId === null && projects.length > 0) {
      setSelectedProjectId(projects[0].projectId)
    }
  })

  const currentProject = projects.find(p => p.projectId === selectedProjectId) || defaultProject

  const handleProjectClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProjectChangeClick = (event, projectId) => {
    setSelectedProjectId(projectId)
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
          selected={project.projectId === selectedProjectId}
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
            onClick={() => router.push(`${path}/${pathname}`)}
            selected={pathname === router.pathname}
          >
            <ListItemIcon><Icon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </>
  )
}
