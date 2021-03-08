import React, { useEffect, useState } from "react"
import { getJoke, Joke } from "../api/backend"

const ThisComponentIsAJoke: React.FC = () => {
  const [joke, setJoke] = useState<Joke>({ text: "Loading a joke ..." })

  useEffect(() => {
    const getNewJoke = async () => {
      try {
        const j = await getJoke()
        setJoke(j)
      } catch (err) {
        setJoke({ text: "Implement /joke endpoint to view a joke here" })
      }
    }

    getNewJoke()
  }, [])

  return (
    <blockquote className="blockquote text-center pb-5">
      <p>{joke ? joke.text : ""}</p>
    </blockquote>
  )
}

export default ThisComponentIsAJoke
