import React, { useEffect, useState } from 'react'
import api from '../../config/api'

export default () => {
  const [settings, setSettings] = useState([])

  useEffect(() => {
    api.get('/me/projects/1/members')
      .then((res) => {
        setSettings(res.data)
      })
      .catch(() => {

      })
      .finally(() => {

      })
  }, [])

  return (
    <>
      <h4>Page settings:</h4>
      {JSON.stringify(settings)}
    </>
  )
}
