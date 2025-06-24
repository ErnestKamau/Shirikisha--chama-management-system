import { useEffect } from "react"

function App() {

  useEffect( () => {
    fetch("/api/home")
    .then( (res) => res.json())
    .then(console.log)
  }, []);
 

  return (
    <>
      <h1 className="text-3xl font-bold bg-red-400"> Hello</h1>
      <p>this is cool</p>
    </>
  )
}

export default App
