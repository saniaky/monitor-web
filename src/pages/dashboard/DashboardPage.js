import React, { useEffect, useState } from 'react'
import Header from '../home/Header'
import api from '../../config/api'

export default (props) => {
  const [projects, setProjects] = useState([])
  const [members, setMembers] = useState([])

  useEffect(() => {
    console.log('making call')
    api.get('/me/projects')
      .then((res) => {
        setProjects(res.data)
      })
      .catch(() => {

      })
      .finally(() => {

      })

    api.get('/me/projects/1/members')
      .then((res) => {
        setMembers(res.data)
      })
      .catch(() => {

      })
      .finally(() => {

      })
  }, [])

  return (
    <div>
      <Header />
      - Response Time: graph
      - Uptime: 100%(last 24 hours), 100%(last 7 days), 100%(last 30 days)
      - Latest downtime: It was recorded on 2020-02-06 14:31:08 and the downtime lasted for 0 hrs, 6 mins.

      Choose project first, then open management?

      Menu:
      - Page
      - Components
      - Subscribers
      - Activity log

      <h2>Projects:</h2>
      {projects.map((project) => (
        <div key={project.projectId}>
          <h3>{project.name}</h3>
          <h4>Members:</h4>
          <ul>
            {members.map(member => (
              <li key={member.userId}>{member.firstName}</li>
            ))}
          </ul>
        </div>
      ))}

    </div>
  )
}
