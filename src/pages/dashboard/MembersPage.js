import React, { useEffect, useState } from 'react'
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

export default () => {
  const [members, setMembers] = useState([])
  const projectService = useProjectService()
  const project = projectService.project

  useEffect(() => {
    api.get(`/projects/${project.projectId}/members`)
      .then((res) => {
        setMembers(res.data)
      })
      .catch(() => {

      })
  }, [project])

  return (
    <>
      <Typography variant='h4' gutterBottom>Members</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((u) => (
              <TableRow key={u.userId}>
                <TableCell>{u.userId}</TableCell>
                <TableCell>{u.firstName}</TableCell>
                <TableCell>{u.lastName}</TableCell>
                <TableCell>{u.avatarUrl || 'N/A'}</TableCell>
                <TableCell>{u.role || 'N/A'}</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
