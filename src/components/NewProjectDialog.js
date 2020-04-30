import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Field, Form, Formik } from 'formik'
import Grid from '@material-ui/core/Grid'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { TextField as FormikTextField } from 'formik-material-ui'
import { useProjectService } from '../pages/dashboard/ProjectContext'

const initialValues = { name: '' }

const validationSchema = Yup.object({
  name: Yup.string('Enter a name')
    .required('Project name is required')
})

export default ({ open, handleSave, handleClose }) => {
  const projectService = useProjectService()

  const handleCreate = (values) => {
    projectService.createProject(values)
      .then(() => {
        toast.success('Project created.')
        handleSave()
      })
      .catch(() => {
        toast.error('Project cant be created.')
      })
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id='form-dialog-title'>New Project</DialogTitle>
      <Formik onSubmit={handleCreate} initialValues={initialValues} validationSchema={validationSchema}>
        {({ values, isSubmitting }) => (
          <Form>
            <DialogContent>
              <DialogContentText>
                Please enter your new project name.
              </DialogContentText>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    component={FormikTextField}
                    name='name'
                    label='Project name'
                    required
                    fullWidth
                    autoFocus
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button type='button' onClick={handleClose}>
                Cancel
              </Button>
              <Button type='submit' color='primary'>
                Create new project
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}
