import React, { useEffect, useState } from 'react'
import api from '../../config/api'
import { useProjectService } from './ProjectContext'

export default () => {
  const [settings, setSettings] = useState([])
  const projectService = useProjectService()
  const project = projectService.project

  useEffect(() => {
    api.get(`/projects/${project.projectId}/members`)
      .then((res) => {
        setSettings(res.data)
      })
      .catch(() => {

      })
      .finally(() => {

      })
  }, [project])

  return (
    <>
      <h4>Page settings:</h4>
      {JSON.stringify(settings)}
    </>
  )
}
