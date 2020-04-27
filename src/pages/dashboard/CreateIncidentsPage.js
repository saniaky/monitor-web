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
import { toast } from 'react-toastify'
import { useRouter } from '../../hooks/useRouter'

const initialValues = {
  name: 'Monitor database incident',
  components: 'website',
  status: 'investigating',
  message: 'Yesterday we had a serious incident with one of our databases. We lost six hours of database data.'
}

export default () => {
  const router = useRouter()
  const projectService = useProjectService()
  const project = projectService.project

  const handleSubmit = (values, { setSubmitting }) => {
    api.post(`/projects/${project.projectId}/incidents`, values)
      .then(() => {
        router.push('/dashboard/incidents')
        toast.success('Issue created')
      })
      .catch((err) => {
        toast.error(JSON.stringify(err?.response?.data?.error || 'Oops. Something went wrong.'))
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <Container maxWidth='sm'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h4'>New Incident</Typography>
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
                <Field
                  component={FormikTextField}
                  name='components'
                  label='Components'
                  margin='normal'
                  variant='outlined'
                  fullWidth
                />
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
