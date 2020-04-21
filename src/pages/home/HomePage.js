import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  }
}))

export default () => {
  const classes = useStyles()

  return (
    <>
      <Header />

      <Container maxWidth='sm' component='main' className={classes.heroContent}>
        <Typography component='h1' variant='h2' align='center' color='textPrimary' gutterBottom>
          Monitoring Service
        </Typography>
        <Typography variant='h4' align='center' color='textSecondary' component='p'>
          Want to monitor your webservice?<br />
          Create account here.
        </Typography>
      </Container>

      <Container maxWidth='md'>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant='h5' color='textSecondary'>Why to use?</Typography>
            <List>
              <ListItem>It's a scalable way of handling incidents communication</ListItem>
              <ListItem>Reduce incoming support requests during outages</ListItem>
              <ListItem>Increase trust of your customers</ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant='h5' color='textSecondary'>
              Features
            </Typography>
            <List>
              <ListItem>
                Alerts: e-mail, Telegram, web-hooks
              </ListItem>
              <ListItem>
                Flexible alerts settings: ignore
              </ListItem>
              <ListItem>
                Metrics: uptime, downtime, response times
              </ListItem>
              <ListItem>
                Maintenance notifications
              </ListItem>
              <ListItem>
                Public status page
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  )
}
