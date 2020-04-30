import React, { useCallback, useEffect, useState } from 'react'
import api from '../../config/api'
import { useProjectService } from './ProjectContext'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { CircularProgress } from '@material-ui/core'
import { useRouter } from '../../hooks/useRouter'
import Paper from '@material-ui/core/Paper'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import AddUpdateDialog from './AddUpdateDialog'
import Moment from 'react-moment'
import { toast } from 'react-toastify'

export default () => {
  const router = useRouter()
  const [stale, setStale] = useState(false)
  const [incident, setIncident] = useState({})
  const [updates, setUpdates] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const projectService = useProjectService()
  const project = projectService.project
  const incidentId = router.query.incidentId

  const loadData = useCallback(() => {
    console.log(stale)
    setIsLoading(true)

    api.get(`/projects/${project.projectId}/incidents/${incidentId}`)
      .then((res) => {
        setIncident(res.data.incident)
        setUpdates(res.data.updates)
      })
      .catch(() => {

      })
      .finally(() => {
        setIsLoading(false)
        setStale(false)
      })
  }, [project, stale, incidentId])

  useEffect(() => {
    loadData()
  }, [loadData, project])

  const handleDelete = (incidentUpdate) => {
    if (window.confirm('You sure?')) {
      setIsLoading(true)
      api.delete(`/projects/${project.projectId}/incidents/${incidentId}/updates/${incidentUpdate.updateId}`)
        .then((res) => {
          toast.success('Incident update removed.')
        })
        .catch(() => {

        })
        .finally(() => {
          setIsLoading(false)
          setStale(true)
        })
    }
  }

  const handleClose = (saved) => {
    setOpen(false)
    if (saved) setStale(true)
  }

  if (isLoading) return <CircularProgress />

  return (
    <Grid container spacing={3}>

      <Grid item xs={12}>
        <Grid container spacing={3} alignItems='center'>
          <Grid item xs={12}>
            <Button onClick={() => router.history.goBack()}>
              <ArrowBackIcon />&nbsp; Back
            </Button>
          </Grid>
          <Grid item>
            <Typography variant='h3'>
              {incident.name}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item>
            <Typography variant='h4'>
              Updates:
            </Typography>
          </Grid>

        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          {!isLoading && updates.length > 0 && updates.map((row, idx) => (
            <Grid item xs={12} key={idx}>
              <Paper style={{ padding: '20px' }}>
                <Grid container justify='space-between' alignItems='center'>
                  <Grid item>
                    <Typography>{row.update_id}</Typography>
                    <Typography>
                      Time:
                      <Moment>
                        {row.created_at}
                      </Moment>
                    </Typography>
                    <Typography>Message: {row.message}</Typography>
                    <Typography>Status: {row.status}</Typography>
                    <Button onClick={() => handleDelete(row)}>
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
          {!isLoading && updates.length === 0 && <div>No data.</div>}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Button onClick={() => setOpen(true)}>Add update</Button>
        <AddUpdateDialog project={project} incident={incident} open={open} handleClose={handleClose} />
      </Grid>

    </Grid>
  )
}
