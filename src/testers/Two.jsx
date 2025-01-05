import React from 'react'

const Two=(props) => {
    const { user, info, users } = props;


  return (
      <div>
          <p>user: {user.name}, age: {user.age} , zodiac:{user.zodiac}</p>
          <h2>info: {info}</h2>
          <ul>
              {users.map((user) => (
                  <li key={user.id}>
                      <h1>*****</h1>
                      <strong>Name:</strong> {user.name} <br />
                      <strong>Age:</strong> {user.age} <br />
                      <strong>Zodiac:</strong> {user.zodiac} <br />
                      <strong>Location:</strong> {user.location}
                  </li>
              ))}
          </ul>
    </div>
  )
}

export default Two;