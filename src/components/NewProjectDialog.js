import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default ({ open, handleClose }) => {
  const handleCreate = (values) => {

  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id='form-dialog-title'>New Project</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your new project name.
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          label='Project name'
          type='text'
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleCreate} color='primary'>
          Create new project
        </Button>
      </DialogActions>
    </Dialog>
  )
}
