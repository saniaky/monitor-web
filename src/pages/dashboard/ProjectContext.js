import React, { createContext, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import api from '../../config/api'

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

  useEffect(() => {
    api.get('/projects')
      .then((res) => {
        setProjects(res.data)
      })
  }, [])

  useEffect(() => {
    if (!project.projectId && projects.length > 0) {
      setProject(projects[0])
    }
  })

  const changeProject = (projectId) => {
    const newProject = projects.filter(p => p.projectId === Number(projectId))
    if (newProject) setProject(newProject)
    else console.error('Project not found.')
  }

  const createProject = () => {

  }

  return {
    project,
    projects,
    createProject,
    changeProject
  }
}
