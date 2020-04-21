import React, { useEffect, useState } from 'react'
import api from '../../config/api'
import { useProjectService } from './ProjectContext'

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
      .finally(() => {

      })
  }, [])

  return (
    <>
      <h4>Subscribers:</h4>
      {members.map(member => (
        <li key={member.userId}>{member.firstName}</li>
      ))}

    </>
  )
}
