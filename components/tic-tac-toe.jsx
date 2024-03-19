import { useEffect, useState } from "react";

export const TicTacToe = () => {
  //state variables
  const [board, setBoard] = useState(Array(9).fill(null));
  const [blueScore, setBlueScore] = useState(0);
  const [redScore, setRedScore] = useState(0);
  const [isBlueNext, setIsBlueNext] = useState(true);

  //track if component is mounted or not
  const [isMounted, setIsMounted] = useState(false);

  //to retrieve the scores from local storage
  useEffect(() => {
    const blueScoreFromStorage = localStorage.getItem("blueScore");
    const redScoreFromStorage = localStorage.getItem("redScore");
    if (blueScoreFromStorage !== null) {
      setBlueScore(parseInt(blueScoreFromStorage));
    }
    if (redScoreFromStorage !== null) {
      setRedScore(parseInt(redScoreFromStorage));
    }
  }, []);

  //to save score to local storage once the component is mounted
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("blueScore", blueScore.toString());
      localStorage.setItem("redScore", redScore.toString());
    } else {
      setIsMounted(true);
    }
  }, [blueScore, redScore, isMounted]);

  //function to handle clicks on squares
  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isBlueNext ? "X" : "O";
    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    if (winner) {
      if (winner === "X") {
        setBlueScore(blueScore + 1);
      } else if (winner === "O") {
        setRedScore(redScore + 1);
      }
    }

    setIsBlueNext(!isBlueNext);
  };

  //component to render squares
  const Cell = ({ index }) => {
    const cellValue = board[index];

    return (
      <td
        className={`border-2 w-[100px] h-[100px] text-center font-[36px] cursor-pointer text-white ${
          cellValue && cellValue === "X" && "bg-blue-500"
        } ${cellValue && cellValue === "O" && "bg-red-500"}`}
        onClick={() => handleClick(index)}
      >
        {cellValue}
      </td>
    );
  };

  //function to check for the winner
  const calculateWinner = (squares) => {
    //winning combinations
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = `Winner: ${winner === "X" ? "Blue" : "Red"}`;
  } else {
    status = `Next player: ${isBlueNext ? "Blue" : "Red"}`;
  }

  return (
    <div className="max-w-fit space-y-6">
      <div>
        <div>{status}</div>
        <div>Blue Score: {blueScore}</div>
        <div>Red Score: {redScore}</div>
      </div>

      <table>
        <tbody>
          <tr>
            <Cell index={0} />
            <Cell index={1} />
            <Cell index={2} />
          </tr>
          <tr>
            <Cell index={3} />
            <Cell index={4} />
            <Cell index={5} />
          </tr>
          <tr>
            <Cell index={6} />
            <Cell index={7} />
            <Cell index={8} />
          </tr>
        </tbody>
      </table>
    </div>
  );
};
