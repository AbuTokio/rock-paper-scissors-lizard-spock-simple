import { Choice } from "../../enums/Choice"

interface ButtonProps {
  label: unknown
  onClick: (choice: Choice) => void
}

export default function Button({ label, onClick }: ButtonProps) {
  return (
    <>
      <button
        className="bg-center bg-size-[50%] bg-no-repeat h-[150px] w-[150px] bg-accent border-16 border-game-button rounded-full cursor-pointer hover:scale-105 active:scale-95"
        onClick={() => onClick(Choice[label as keyof typeof Choice])}
        style={{
          backgroundImage: `url("/src/assets/images/icon-${String(label).toLowerCase()}.svg")`,
        }}></button>
    </>
  )
}
