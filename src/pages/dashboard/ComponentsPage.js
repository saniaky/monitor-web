import React, { useEffect, useState } from 'react'
import api from '../../config/api'
import { useProjectService } from './ProjectContext'

export default () => {
  const [components, setComponents] = useState([])
  const projectService = useProjectService()
  const project = projectService.project

  useEffect(() => {
    api.get(`/projects/${project.projectId}/members`)
      .then((res) => {
        setComponents(res.data)
      })
      .catch(() => {

      })
      .finally(() => {

      })
  }, [project])

  return (
    <>
      <h4>Components:</h4>
      {JSON.stringify(components)}
    </>
  )
}
