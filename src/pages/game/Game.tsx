import { useEffect, useState } from "react"
import Button from "../../components/button/Button"
import { Result } from "../../enums/Result"
import { Choice } from "../../enums/Choice"

export default function Game() {
  const [playerChoice, setPlayerChoice] = useState<Choice>(Choice.NOTHING)
  const [cpuChoice, setCpuChoice] = useState<Choice>(Choice.LIZARD)
  const [result, setResult] = useState<Result>(Result.NOTHING)
  const [showReset, setShowReset] = useState<boolean>(false)
  const [played, setPlayed] = useState<boolean>(false)

  const [defeatTable] = useState<
    {
      defeats: Choice[]
    }[]
  >([
    { defeats: [Choice.NOTHING, Choice.NOTHING] },
    { defeats: [Choice.SCISSORS, Choice.LIZARD] },
    { defeats: [Choice.ROCK, Choice.SPOCK] },
    { defeats: [Choice.PAPER, Choice.LIZARD] },
    { defeats: [Choice.PAPER, Choice.SPOCK] },
    { defeats: [Choice.SCISSORS, Choice.ROCK] },
  ])

  const handleChoice = (choice: Choice) => {
    if (!played) {
      setPlayerChoice(choice)
      setPlayed(true)
    }
  }

  useEffect(() => {
    if (played) {
      setCpuChoice(Math.floor(Math.random() * (Object.entries(Choice).length / 2 - 1) + 1))
      // getResult()
      setShowReset(true)
    }
  }, [played])

  useEffect(() => {
    getResult()
  }, [cpuChoice])

  function getResult() {
    if (playerChoice === cpuChoice) {
      setResult(Result.DRAW)
    } else if (defeatTable[playerChoice].defeats.includes(cpuChoice)) {
      setResult(Result.WIN)
    } else {
      setResult(Result.LOSE)
    }
  }

  return (
    <>
      <main className="flex flex-col w-screen h-screen justify-center items-center gap-8">
        <h1 className="text-6xl">Rock, Paper, Scissors, Lizard, Spock</h1>
        <h2 className="text-3xl">Choose your weapon</h2>

        {playerChoice !== Choice.NOTHING && (
          <>
            <div className="flex flex-col justify-center items-center">
              <p>YOU: {Object.values(Choice)[Object.keys(Choice).indexOf(playerChoice.toFixed())]}</p>
              <p>CPU: {Object.values(Choice)[Object.keys(Choice).indexOf(cpuChoice.toFixed())]}</p>
              <p
                className={`${
                  result === Result.WIN ? "text-green-800" : result === Result.DRAW ? "text-yellow-800" : "text-red-800"
                } font-bold`}>
                {result}
              </p>
            </div>
          </>
        )}

        <div className="flex justify-center items-center gap-8">
          {Object.entries(Choice).map(([key, value]) => {
            if (Number(key) > 0 && Number(key) <= Object.entries(Choice).length / 2 - 1)
              return <Button key={key} label={value} onClick={handleChoice} />
          })}
        </div>

        {showReset && (
          <div>
            <button
              className="bg-zinc-200 px-4 py-2 border-2 border-game-button cursor-pointer hover:scale-105 active:scale-95"
              onClick={() => {
                setPlayerChoice(Choice.NOTHING)
                setCpuChoice(Choice.NOTHING)
                setResult(Result.NOTHING)
                setShowReset(false)
                setPlayed(false)
              }}>
              Restart Game
            </button>
          </div>
        )}
      </main>
    </>
  )
}
