import React, { useCallback, useEffect, useState } from 'react'
import api from '../../config/api'
import { useProjectService } from './ProjectContext'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import gravatarUrl from 'gravatar-url'
import Avatar from '@material-ui/core/Avatar'
import InviteDialog from './InviteDialog'
import { toast } from 'react-toastify'

export default () => {
  const [members, setMembers] = useState([])
  const [invitations, setInvitations] = useState([])
  const projectService = useProjectService()
  const project = projectService.project
  const projectId = project.projectId
  const [inviteOpen, setInviteOpen] = useState(false)
  const [invitationsLoading, setInvitationsLoading] = useState(true)

  const loadInvites = useCallback(() => {
    setInvitationsLoading(true)
    api.get(`/projects/${projectId}/invites`)
      .then((res) => {
        setInvitations(res.data)
      })
      .finally(() => {
        setInvitationsLoading(false)
      })
  }, [projectId])

  useEffect(() => {
    loadInvites()
    api.get(`/projects/${projectId}/members`)
      .then((res) => {
        setMembers(res.data)
      })
      .catch(() => {

      })
  }, [projectId, loadInvites])

  const handleInviteClose = (added) => {
    setInviteOpen(false)
    if (added) {
      loadInvites()
    }
  }

  const handleDeleteInvite = (i) => {
    api.delete(`/projects/${projectId}/invites/${i.inviteId}`)
      .then(() => {
        toast.success('Invite removed.')
        loadInvites()
      })
  }

  return (
    <Grid container spacing={3}>

      <Grid item xs={12}>
        <Typography variant='h4' gutterBottom>Members</Typography>
      </Grid>

      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((u) => (
                <TableRow key={u.userId}>
                  <TableCell>
                    <Avatar
                      alt={u.firstName}
                      src={u.email ? gravatarUrl(u.email) : 'N/A'}
                    />
                  </TableCell>
                  <TableCell>{u.firstName}</TableCell>
                  <TableCell>{u.lastName}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell>
                    <Button disabled={u.role === 'ADMIN'}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={12}>
        <Button onClick={() => setInviteOpen(true)} variant='outlined'>
          Invite new member
        </Button>
        <InviteDialog
          open={inviteOpen}
          project={project}
          handleClose={handleInviteClose}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h5' gutterBottom>
          {invitations.length > 0 ? 'Invitations' : 'No invitations sent'}
        </Typography>
      </Grid>

      {invitations.length > 0 && (
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Avatar</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invitations.map((i) => (
                  <TableRow key={i.inviteId}>
                    <TableCell>
                      <Avatar
                        alt={i.firstName}
                        src={i.email ? gravatarUrl(i.email) : 'N/A'}
                      />
                    </TableCell>
                    <TableCell>{i.email}</TableCell>
                    <TableCell>{i.role}</TableCell>
                    <TableCell>Waiting</TableCell>
                    <TableCell>
                      <Button
                        disabled={invitationsLoading}
                        onClick={() => handleDeleteInvite(i)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}

    </Grid>
  )
}
