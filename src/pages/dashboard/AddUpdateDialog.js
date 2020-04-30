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
  message: '',
  status: 'INVESTIGATING'
}

export default ({ project, incident, open, handleClose }) => {
  if (!open) return null

  const handleSubmit = (values, { setSubmitting }) => {
    api.post(`/projects/${project.projectId}/incidents/${incident.incidentId}/updates`, values)
      .then((res) => {
        handleClose(true, res)
        toast.success(`New updated added for ${project.name}`)
      })
      .catch((err) => {
        toast.error(JSON.stringify(err?.response?.data?.error) || 'Cannot add update.')
      })
      .finally(() => setSubmitting(false))
  }

  return (
    <Dialog open={open} onClose={() => handleClose(false)}>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {({ isSubmitting }) => (
          <Form>

            <DialogTitle>Add update</DialogTitle>

            <DialogContent>
              <DialogContentText>
                To add new update by filling out some details below:
              </DialogContentText>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field component={FormikRadioGroup} name='status'>
                    <FormControlLabel
                      value='INVESTIGATING'
                      control={<Radio disabled={isSubmitting} />}
                      label='Investigating'
                      disabled={isSubmitting}
                    />
                    <FormControlLabel
                      value='IDENTIFIED'
                      control={<Radio disabled={isSubmitting} />}
                      label='Identified'
                      disabled={isSubmitting}
                    />
                    <FormControlLabel
                      value='MONITORING'
                      control={<Radio disabled={isSubmitting} />}
                      label='Monitoring'
                    />
                    <FormControlLabel
                      value='RESOLVED'
                      control={<Radio disabled={isSubmitting} />}
                      label='Resolved'
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
                Add
              </Button>
            </DialogActions>

          </Form>
        )}
      </Formik>

    </Dialog>
  )
}
