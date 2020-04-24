import React from 'react'
import { useParams } from 'react-router'

export default () => {
  const params = useParams()

  return (
    <h1>
      Status Page for Project {params.projectId}
    </h1>
  )
}
