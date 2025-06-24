import { useEffect } from "react"

function App() {

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
  }, [])

  return (
    <div className="p-4">
    </div>
  )
}

export default App
