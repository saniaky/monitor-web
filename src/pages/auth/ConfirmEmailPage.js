import React, { useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CopyrightText from '../../components/CopyrightText'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getErrorMsg } from '../../utils/errors'
import { useAuth } from '../../hooks/useAuth'
import { useRouter } from '../../hooks/useRouter'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  }
}))

export default function SignUp () {
  const classes = useStyles()
  const auth = useAuth()
  const history = useHistory()
  const router = useRouter()

  useEffect(() => {
    if (router.query.token) {
      console.log('verifying email...')
      auth.confirmEmail(router.query.token)
        .then(() => {
          toast.success('Thank you, your email validated!')
          history.push('/')
        })
        .catch((e) => {
          toast.error(getErrorMsg(e.response.data))
        })
        .finally(() => {

        })
    } else {
      toast.error('Sorry, but your link is broken, please try again.')
      history.push('/')
    }
  }, [auth, history, router.query])

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Confirming your email...
        </Typography>
      </div>
      <Box mt={5}>
        <CopyrightText />
      </Box>
    </Container>
  )
}
