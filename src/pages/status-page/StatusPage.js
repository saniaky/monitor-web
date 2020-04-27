import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import api from '../../config/api'
import { CircularProgress } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

export default () => {
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [project, setProject] = useState()
  const [incidents, setIncidents] = useState([])
  const [error, setError] = useState()

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
        setError('Error')
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
            Past Incidents
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <List>
            {incidents.map((row) => (
              <ListItem key={row.incidentId}>
                {row.status} {row.name} {row.components}
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  )
}
