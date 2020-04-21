import React, { useEffect, useState } from 'react'
import api from '../../config/api'
import { useProjectService } from './ProjectContext'

export default () => {
  const [incidents, setIncidents] = useState([])
  const projectService = useProjectService()
  const project = projectService.project

  useEffect(() => {
    api.get(`/projects/${project.projectId}/members`)
      .then((res) => {
        setIncidents(res.data)
      })
      .catch(() => {

      })
      .finally(() => {

      })
  }, [])

  return (
    <>
      <h4>Incidents:</h4>
      {JSON.stringify(incidents)}
    </>
  )
}
