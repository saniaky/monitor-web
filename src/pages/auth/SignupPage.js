import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CopyrightText from '../../components/CopyrightText'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getErrorMsg } from '../../utils/errors'
import { useAuth } from '../../hooks/useAuth'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'

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
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const initialValues = {
  firstName: 'John',
  lastName: 'Doe',
  email: '',
  password: ''
}

export default function SignUp () {
  const classes = useStyles()
  const auth = useAuth()
  const history = useHistory()

  const signup = (values, { setSubmitting }) => {
    auth.createAccount(values)
      .then(() => {
        toast.success('Account created! Welcome!')
        history.push('/login')
      })
      .catch((e) => {
        toast.error(getErrorMsg(e.response.data))
      })
      .finally(() => setSubmitting(false))
  }

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Formik onSubmit={signup} initialValues={initialValues}>
          {({ isSubmitting }) => (
            <Form className={classes.form}>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    autoComplete='fname'
                    name='firstName'
                    type='text'
                    label='First Name'
                    required
                    variant='outlined'
                    fullWidth
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    autoComplete='lname'
                    name='lastName'
                    type='text'
                    label='Last Name'
                    required
                    variant='outlined'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name='email'
                    type='email'
                    label='Email Address'
                    required
                    variant='outlined'
                    fullWidth
                    autoComplete='email'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name='password'
                    type='password'
                    label='Password'
                    required
                    variant='outlined'
                    fullWidth
                    autoFocus
                    autoComplete='current-password'
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify='flex-end'>
                <Grid item>
                  <Link to='/login' variant='body2' component={RouterLink}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
      <Box mt={5}>
        <CopyrightText />
      </Box>
    </Container>
  )
}
