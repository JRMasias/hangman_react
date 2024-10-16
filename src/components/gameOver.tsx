import PlayAgainButton from "./playAgainButton";


export default function GameOver() {
    return (
        <div className="w-screen h-screen bg-black/80 flex flex-col justify-center items-center absolute top-0 left-0 z-40">
            <div className="w-4/5 h-40 flex flex-col justify-evenly items-center bg-gradient-to-br from-neutral-600 from-40% to-neutral-800 to-100% rounded-3xl">
                <p className="text-xl font-extrabold text-red-600">Game Over</p>
                <PlayAgainButton />
            </div>
        </div>
    );
}