import React from 'react'
import { useProjectService } from './ProjectContext'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Field, Form, Formik } from 'formik'
import { RadioGroup as FormikRadioGroup, TextField as FormikTextField } from 'formik-material-ui'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import api from '../../config/api'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import Divider from '@material-ui/core/Divider'

const initialValues = {
  name: '',
  status: 'investigating',
  message: ''
}

export default () => {
  const projectService = useProjectService()
  const project = projectService.project

  const handleSubmit = (values, { setSubmitting }) => {
    api.post(`/${project.projectId}/incidents`, values)
      .then(() => {

      })
      .catch(() => {

      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <Container maxWidth='sm'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h4'>Incident Details</Typography>
        </Grid>

        <Grid item xs={12}>
          <Formik onSubmit={handleSubmit} initialValues={initialValues}>
            {({ isSubmitting }) => (
              <Form>
                <Field
                  component={FormikTextField}
                  name='name'
                  label='Incident name'
                  margin='normal'
                  required
                  variant='outlined'
                  fullWidth
                  autoFocus
                />

                <Divider variant='inset' />

                <Field component={FormikRadioGroup} name='status'>
                  <FormControlLabel
                    value='investigating'
                    control={<Radio disabled={isSubmitting} />}
                    label='Investigating'
                    disabled={isSubmitting}
                  />
                  <FormControlLabel
                    value='identified'
                    control={<Radio disabled={isSubmitting} />}
                    label='Identified'
                    disabled={isSubmitting}
                  />
                  <FormControlLabel
                    value='Monitoring'
                    control={<Radio disabled={isSubmitting} />}
                    label='Monitoring'
                  />
                  <FormControlLabel
                    value='Resolved'
                    control={<Radio disabled={isSubmitting} />}
                    label='Resolved'
                  />
                </Field>
                <Field
                  component={FormikTextField}
                  name='message'
                  type='message'
                  label='Message'
                  margin='normal'
                  required
                  variant='outlined'
                  fullWidth
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  disabled={isSubmitting}
                >
                  Create
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>

  )
}
