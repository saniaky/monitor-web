import React, { useEffect, useState } from 'react'
import api from '../../config/api'

export default () => {
  const [components, setComponents] = useState([])

  useEffect(() => {
    api.get('/me/projects/1/members')
      .then((res) => {
        setComponents(res.data)
      })
      .catch(() => {

      })
      .finally(() => {

      })
  }, [])

  return (
    <>
      <h4>Components:</h4>
      {JSON.stringify(components)}
    </>
  )
}
