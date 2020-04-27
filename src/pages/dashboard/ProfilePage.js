import React, { useEffect, useState } from 'react'
import api from '../../config/api'
import Typography from '@material-ui/core/Typography'
import { Field, Form, Formik } from 'formik'
import Grid from '@material-ui/core/Grid'
import { TextField } from 'formik-material-ui'
import Button from '@material-ui/core/Button'
import { toast } from 'react-toastify'
import Container from '@material-ui/core/Container'
import gravatarUrl from 'gravatar-url'
import Avatar from '@material-ui/core/Avatar'
import { CircularProgress } from '@material-ui/core'

const initialValues = {
  firstName: '',
  lastName: '',
  email: ''
}

export default () => {
  const [profile, setProfile] = useState(initialValues)

  useEffect(() => {
    api.get('/me')
      .then((res) => {
        const { firstName, lastName, email } = res.data
        setProfile({ firstName, lastName, email })
      })
      .catch(err => {
        toast.error(err?.response?.data?.error || 'Cannot load user profile.')
      })
  }, [])

  const handleSave = (values, { setSubmitting }) => {
    api.put('/me', values)
      .then(() => {
        toast.success('Profile updated.')
      })
      .catch(err => {
        toast.error(JSON.stringify(err?.response?.data?.error) || 'Cannot update profile for now.')
      })
      .finally(() => setSubmitting(false))
  }

  if (!profile.email) return <CircularProgress />

  const getUrl = gravatarUrl(profile.email || '', { size: 200 })

  return (
    <Container maxWidth='md'>
      <Typography variant='h4' gutterBottom>Profile</Typography>
      <Formik onSubmit={handleSave} initialValues={profile} enableReinitialize>
        {({ isSubmitting }) => {
          return (
            <Form>
              <Grid container spacing={3}>
                <Grid item>
                  <Avatar
                    alt={profile.name}
                    src={getUrl}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
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
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </Container>
  )
}
