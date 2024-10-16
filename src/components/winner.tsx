import PlayAgainButton from "./playAgainButton";

interface props {
    points: number
}

export default function Winner(props: props) {
    return (
        <div className="w-screen h-screen bg-black/90 flex flex-col justify-center items-center absolute top-0 left-0 z-50">
            <div className="w-4/5 h-40 flex flex-col justify-evenly items-center bg-gradient-to-br from-neutral-600 from-40% to-neutral-800 to-100% rounded-3xl">
                <div className="flex justify-center items-center">
                    <p className="text-white">Points accrued:</p>
                    <p className="text-white font-extrabold">&nbsp;{props.points}</p>

                </div>
                <p className="text-xl font-extrabold text-green-300">You win!!</p>
                <PlayAgainButton />
            </div>
        </div>
    );
}