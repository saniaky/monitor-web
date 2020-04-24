import React, { useEffect, useState } from 'react'
import api from '../../config/api'
import { useProjectService } from './ProjectContext'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Grid from '@material-ui/core/Grid'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import { CircularProgress } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { useRouter } from '../../hooks/useRouter'
import BugReportIcon from '@material-ui/icons/BugReport'
import Paper from '@material-ui/core/Paper'

export default () => {
  const router = useRouter()
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
        <Grid container spacing={3}>
          <Grid item>
            <Typography variant='h4'>Incidents</Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => router.push('/dashboard/new-incident')}>
              <AddCircleIcon />&nbsp; Create
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Tabs value={value} onChange={handleChange}>
          <Tab value='open' label='Open' />
          <Tab value='closed' label='Closed' />
        </Tabs>
      </Grid>

      <Grid item xs={12} md={6}>
        <Grid container spacing={2}>
          {!isLoading && incidents.length > 0 && incidents.map((row, idx) => (
            <Grid item xs={12} key={idx}>
              <Paper style={{ padding: '20px' }}>
                <Grid container justify='space-between' alignItems='center'>
                  <Grid item>
                    <Typography variant='h4'><BugReportIcon /> &nbsp; {row.name}</Typography>
                  </Grid>
                  <Grid item>
                    <Button variant='outlined'>Update</Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>

    </Grid>
  )
}
