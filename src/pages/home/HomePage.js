import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { makeStyles } from '@material-ui/core/styles'

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

      <Container>
        Why to use?
        - It's a scalable way of handling incidents communication
        - Reduce incoming support requests during outages
        - Increase trust of your customers
      </Container>

      <Container maxWidth='md' component='main'>
        <Typography variant='h5' color='textSecondary' component='p'>
          Features:
        </Typography>
        <List>
          <ListItem>
            Multiple Checks: HTTP(s), ping, port, heartbeat
          </ListItem>
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
            Maintenance
          </ListItem>
          <ListItem>
            Public status page
          </ListItem>
          <ListItem>
            Regions
          </ListItem>
        </List>
      </Container>

      <Footer />
    </>
  )
}
