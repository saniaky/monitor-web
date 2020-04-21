import React, { useEffect, useState } from 'react'
import api from '../../config/api'

export default () => {
  const [members, setMembers] = useState([])

  useEffect(() => {
    api.get('/projects/1/members')
      .then((res) => {
        setMembers(res.data)
      })
      .catch(() => {

      })
      .finally(() => {

      })
  }, [])

  return (
    <>

      <h4>Members:</h4>
      {members.map(member => (
        <li key={member.userId}>{member.firstName}</li>
      ))}

    </>
  )
}
