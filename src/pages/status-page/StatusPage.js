import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import api from '../../config/api'
import { CircularProgress } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Moment from 'react-moment'

export default () => {
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [project, setProject] = useState()
  const [incidents, setIncidents] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api.get(`/projects/${params.projectId}`)
      .then((res) => {
        setProject(res.data)
      })
      .catch(() => {
        setError('Error')
      })
      .finally(() => {
        setLoading(false)
      })

    api.get(`/projects/${params.projectId}/incidents`)
      .then((res) => {
        setIncidents(res.data)
      })
      .catch(() => {
        setError('Cant load incidents')
      })
      .finally(() => {

      })
  }, [params])

  if (loading) return <CircularProgress />

  return (
    <Container maxWidth='md'>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant='h2'>
            Status Page for "{project.name}"
          </Typography>
        </Grid>

        {error && (
          <Grid item xs={12}>
            <Typography>
              {error}
            </Typography>
          </Grid>
        )}

        <Grid item xs={12}>
          <Typography variant='h4'>
            Incidents
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={5}>
            {incidents.map((row) => (
              <Grid item xs={12} key={row.incidentId}>
                <Paper style={{ padding: '20px' }}>

                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant='h5'>{row.status} - {row.name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography><strong>Components</strong>: {row.components}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography><strong>Updates:</strong></Typography>
                      <br />
                    </Grid>
                    {row.updates.map(update => (
                      <>
                        <Grid item xs={12}>
                          <Typography>
                            <Moment date={update.created_at} />
                          </Typography>
                          <Typography>
                            {update.status}
                          </Typography>
                          <Typography>
                            {update.message}
                          </Typography>
                        </Grid>
                        <hr />
                      </>
                    ))}
                  </Grid>

                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
