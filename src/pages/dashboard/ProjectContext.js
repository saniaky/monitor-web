import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../../config/api'
import { toast } from 'react-toastify'

const ProjectContext = createContext()

export const useProjectService = () => {
  return useContext(ProjectContext)
}

export function ProvideProject ({ children }) {
  const project = useProvideProject()
  return (
    <ProjectContext.Provider value={project}>
      {children}
    </ProjectContext.Provider>
  )
}

const defaultProject = { projectId: null, name: '{ Choose a project }' }

function useProvideProject () {
  const [projects, setProjects] = useState(false)
  const [project, setProject] = useState(defaultProject)
  const [stale, setStale] = useState(false)

  useEffect(() => {
    api.get('/projects')
      .then((res) => {
        setProjects(res.data)
        setStale(false)
        const oldProject = res.data.find(p => p.projectId === project.projectId)
        setProject(oldProject || res.data[0])
      })
      .catch((err) => {
        toast.error(JSON.stringify(err?.response?.data?.error))
      })
  }, [stale, project.projectId])

  useEffect(() => {
    if (stale && projects.length > 0 && project.projectId) {
      const newVal = projects.find(p => p.projectId === project.projectId)
      if (newVal) setProject(newVal)
    }
  }, [project, projects, stale])

  const changeProject = (projectId) => {
    const newProject = projects.find(p => p.projectId === Number(projectId))
    if (newProject) setProject(newProject)
    else console.error('Project not found.')
  }

  const createProject = (values) => {
    return api.post('/projects', values)
      .then(res => {
        const newProject = res.data
        setProject(newProject)
        setProjects(prevState => prevState.concat(newProject))
        return newProject
      })
  }

  const refreshProject = () => {
    setStale(true)
  }

  return {
    project,
    projects,
    createProject,
    changeProject,
    refreshProject
  }
}
