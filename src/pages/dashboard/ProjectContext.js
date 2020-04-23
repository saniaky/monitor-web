import React, { createContext, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
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

const defaultProject = { projectId: null, name: 'Loading...' }

function useProvideProject () {
  const [projects, setProjects] = useState(false)
  const [project, setProject] = useLocalStorage('monitor_project', defaultProject)
  const [stale, setStale] = useState(true)

  useEffect(() => {
    if (!stale) return
    api.get('/projects')
      .then((res) => {
        setProjects(res.data)
        setStale(false)
      })
      .catch((err) => {
        toast.error(JSON.stringify(err?.response?.data?.error))
      })
  }, [stale])

  useEffect(() => {
    if (!project.projectId && projects.length > 0) {
      setProject(projects[0])
    }
    if (stale && projects.length > 0) {
      setProject(projects.find(p => p.projectId === project.projectId))
    }
  })

  const changeProject = (projectId) => {
    const newProject = projects.filter(p => p.projectId === Number(projectId))
    if (newProject) setProject(newProject)
    else console.error('Project not found.')
  }

  const createProject = () => {

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
