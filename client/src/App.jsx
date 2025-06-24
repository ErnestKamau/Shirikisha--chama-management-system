import { useEffect, useState } from "react"

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setUsers(data.users)
      })
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold bg-red-400">Hello</h1>
      <p>This is cool</p>
      <ul className="mt-4">
        {users.map((user) => (
          <p key={user.id} className="text-lg">{user.full_name}</p>
        ))}
      </ul>
    </div>
  )
}

export default App
