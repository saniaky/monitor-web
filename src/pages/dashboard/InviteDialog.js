import React from 'react'
import api from '../../config/api'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { Field, Form, Formik } from 'formik'
import Grid from '@material-ui/core/Grid'
import { RadioGroup as FormikRadioGroup, TextField as FormikTextField } from 'formik-material-ui'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import { toast } from 'react-toastify'

const initialValues = {
  role: 'ADMIN',
  email: '',
  message: 'Hey, lets collaborate on this project together.'
}

export default ({ project, open, handleClose }) => {
  if (!open) return null

  const handleInvite = (values, { setSubmitting }) => {
    api.post(`/projects/${project.projectId}/invites`, values)
      .then((res) => {
        handleClose(true, res)
        toast.success('Invitation sent.')
      })
      .catch((err) => {
        toast.error(JSON.stringify(err?.response?.data?.error) || 'Cannot invite for now.')
      })
      .finally(() => setSubmitting(false))
  }

  return (
    <Dialog open={open} onClose={() => handleClose(false)}>
      <Formik onSubmit={handleInvite} initialValues={initialValues}>
        {({ isSubmitting }) => (
          <Form>

            <DialogTitle>Add member</DialogTitle>

            <DialogContent>
              <DialogContentText>
                To add new member fill out some details below:
              </DialogContentText>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    component={FormikTextField}
                    name='email'
                    type='email'
                    label='Email Address'
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field component={FormikRadioGroup} name='role'>
                    <FormControlLabel
                      value='ADMIN'
                      control={<Radio disabled={isSubmitting} />}
                      label='Administrator'
                      disabled={isSubmitting}
                    />
                    <FormControlLabel
                      value='MEMBER'
                      control={<Radio disabled={isSubmitting} />}
                      label='Member'
                      disabled={isSubmitting}
                    />
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={FormikTextField}
                    name='message'
                    type='message'
                    label='Message'
                    fullWidth
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button
                type='button'
                onClick={() => handleClose(false)}
                color='default'
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type='submit' color='primary' disabled={isSubmitting}>
                Invite
              </Button>
            </DialogActions>

          </Form>
        )}
      </Formik>

    </Dialog>
  )
}
