import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Field, Form, Formik } from 'formik'
import Grid from '@material-ui/core/Grid'
import { TextField } from 'formik-material-ui'
import Button from '@material-ui/core/Button'
import { useProjectService } from './ProjectContext'
import api from '../../config/api'
import { toast } from 'react-toastify'

export default () => {
  const projectService = useProjectService()
  const project = projectService.project

  const handleSave = (values, { setSubmitting }) => {
    api.put(`/projects/${project.projectId}`, values)
      .then(() => {
        toast.success('Updated.')
        projectService.refreshProject()
      })
      .catch(err => {
        toast.error(JSON.stringify(err?.response?.data?.error) || 'Cannot update for now.')
      })
      .finally(() => setSubmitting(false))
  }

  const deleteProject = () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      api.delete(`/projects/${project.projectId}`)
        .then(() => {
          toast.success('Project deleted..')
          projectService.refreshProject()
        })
        .catch(err => {
          toast.error(JSON.stringify(err?.response?.data?.error) || 'Cannot delete for now.')
        })
        .finally(() => console.log('done'))
    }
  }

  return (
    <>

      <Typography variant='h4' gutterBottom>Project settings</Typography>
      <Formik onSubmit={handleSave} initialValues={project} enableReinitialize>
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  name='name'
                  label='Project name'
                  required
                  variant='outlined'
                  fullWidth
                  autoFocus
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

            <br />

            <Grid container spacing={3}>
              <Button onClick={deleteProject} color='secondary'>
                Delete project
              </Button>
            </Grid>

          </Form>
        )}
      </Formik>

    </>
  )
}
