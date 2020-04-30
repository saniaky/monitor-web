import React, { useCallback, useEffect, useState } from 'react'
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
import { toast } from 'react-toastify'

export default () => {
  const router = useRouter()
  const [incidents, setIncidents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [status, setStatus] = useState('OPEN')
  const projectService = useProjectService()
  const project = projectService.project

  const loadData = useCallback(() => {
    setIsLoading(true)
    api.get(`/projects/${project.projectId}/incidents?status=${status}`)
      .then((res) => {
        setIncidents(res.data)
      })
      .catch(() => {

      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [project, status])

  useEffect(() => {
    loadData()
  }, [loadData, project])

  const handleChange = (e, newValue) => {
    setStatus(newValue)
  }

  if (isLoading) return <CircularProgress />

  const close = (incident) => {
    if (window.confirm(`Are you sure want to close "${incident.name}"?`)) {
      const params = {
        status: 'CLOSED'
      }
      api.put(`/projects/${project.projectId}/incidents/${incident.incidentId}`, params)
        .then(res => {
          toast.success(`Incident ${incident.name} deleted.`)
          loadData()
        })
        .catch(() => {
          toast.error(`Can' delete incident ${incident.name}.`)
        })
    }
  }

  const noIncidents = (
    <>
      <Grid item xs={12}>
        <Typography variant='h4'>Hooray! No incidents!</Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <img
          src={require('../../assets/undraw_having_fun_iais.svg')}
          alt='No incidents'
          style={{ width: '100%' }}
        />
      </Grid>
    </>
  )

  return (
    <Grid container spacing={3}>

      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item>
            <Typography variant='h3'>Incidents</Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => router.push('/dashboard/new-incident')}>
              <AddCircleIcon />&nbsp; Create
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Tabs value={status} onChange={handleChange}>
          <Tab value='OPEN' label='Open' />
          <Tab value='CLOSED' label='Closed' />
        </Tabs>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          {!isLoading && incidents.length > 0 && incidents.map((row, idx) => (
            <Grid item xs={12} key={idx}>
              <Paper style={{ padding: '20px' }}>
                <Grid container justify='space-between' alignItems='center'>
                  <Grid item>
                    <Typography variant='h4'><BugReportIcon /> &nbsp; {row.name}</Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant='outlined'
                      onClick={() => router.push(`/dashboard/incidents/${row.incidentId}`)}
                    >
                      Update
                    </Button>
                    &nbsp;
                    {row.status === 'OPEN' && (
                      <Button variant='outlined' color='secondary' onClick={() => close(row)}>
                        Close
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
          {!isLoading && incidents.length === 0 && noIncidents}
        </Grid>
      </Grid>

    </Grid>
  )
}
