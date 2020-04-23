import React, { useEffect, useState } from 'react'
import api from '../../config/api'
import { useProjectService } from './ProjectContext'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Grid from '@material-ui/core/Grid'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import { CircularProgress } from '@material-ui/core'

export default () => {
  const [incidents, setIncidents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState('open')
  const projectService = useProjectService()
  const project = projectService.project

  useEffect(() => {
    setIsLoading(true)
    api.get(`/projects/${project.projectId}/incidents`)
      .then((res) => {
        setIncidents(res.data)
      })
      .catch(() => {

      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [project])

  const handleChange = (e, newValue) => {
    setValue(newValue)
  }

  if (isLoading) return <CircularProgress />

  return (
    <Grid container spacing={3}>

      <Grid item xs={12}>
        <Typography variant='h4'>Incidents</Typography>
      </Grid>

      <Grid item xs={12}>
        <Tabs value={value} onChange={handleChange}>
          <Tab value='open' label='Open' />
          <Tab value='closed' label='Closed' />
        </Tabs>
      </Grid>

      {!isLoading && incidents.length > 0 && incidents.map((row, idx) => (
        <Grid item xs={12} key={idx}>
          <Typography variant='h4'>Title</Typography>
          <Typography>Investigating</Typography>
          <Typography>13 days ago (13:42 UTC)</Typography>
          <Button>Update</Button>
        </Grid>
      ))}

    </Grid>
  )
}
