import React, { useEffect, useState } from 'react'
import api from '../../config/api'

export default () => {
  const [incidents, setIncidents] = useState([])

  useEffect(() => {
    api.get('/me/projects/1/members')
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
