import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink, Redirect } from 'react-router-dom'
import CopyrightText from '../../components/CopyrightText'
import { Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import { useAuth } from '../../hooks/useAuth'
import { getErrorMsg } from '../../utils/errors'
import { useLocation } from 'react-router'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default () => {
  const classes = useStyles()
  const auth = useAuth()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/' } }

  if (auth.user) {
    return <Redirect to={from} />
  }

  const login = (values, { setSubmitting }) => {
    const { email, password } = values
    auth.login(email, password)
      .then(() => {
        toast.success('Welcome back!')
      })
      .catch((e) => {
        toast.error(getErrorMsg(e.response.data, 'Invalid email/password'))
      })
      .finally(() => setSubmitting(false))
  }

  return (
    <Grid container component='main' className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Formik onSubmit={login} initialValues={{ email: 'saniaky@gmail.com', password: '123456' }}>
            {({ isSubmitting }) => (
              <Form className={classes.form}>
                <Field
                  component={TextField}
                  name='email'
                  type='email'
                  label='Email Address'
                  margin='normal'
                  required
                  variant='outlined'
                  fullWidth
                  autoFocus
                  autoComplete='email'
                />
                <Field
                  component={TextField}
                  name='password'
                  type='password'
                  label='Password'
                  margin='normal'
                  required
                  variant='outlined'
                  fullWidth
                  autoFocus
                  autoComplete='current-password'
                />
                <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Remember me'
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  disabled={isSubmitting}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to='/forgot-password' variant='body2' component={RouterLink}>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to='/signup' variant='body2' component={RouterLink}>
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <CopyrightText />
                </Box>
              </Form>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
  )
}
