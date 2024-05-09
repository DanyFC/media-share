"use client"
import { AuthContext } from "@/context/auth/context"
import { useContext, useEffect } from "react"

const Home = () => {
  const { authenticated, validateSession } = useContext(AuthContext)

  useEffect(() => {
    (async () => {
      try {
        await validateSession()
      } catch (error) {
        console.log(error.message)
      }
    })()
  }, [])

  return (
    <div>Home
    </div>
  )
}

export default Home