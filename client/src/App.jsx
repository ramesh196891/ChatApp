import { useEffect, useState } from 'react'
import io from "socket.io-client";
import Input from './components/input';

function App() {
  const [score, setScore] = useState({});
  const [scores, setScores] = useState([]);

  const socket = io("http://localhost:3000");

  function connectSocket(){
    socket.on("connection", (socket) => {
      
    });
  }

  function handleInput(event){
    let {name, value} = event.target;
    let currentObj = { [name]: value };

    setScore((prev) => ({...prev, ...currentObj}));
  }

  function sendScore(){
    socket.emit("scores", score);

    socket.on("playerScores", (playerScores) => {
      setScores(playerScores);
    });
  }

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <h1>
          Multiplayer Dashboard
        </h1>

        <div className='flex flex-col gap-2'>
          <Input name="name" placeholder="enter your name" handleInput={handleInput}/>
          <Input name="score" placeholder="enter your score" handleInput={handleInput}/>

          <button onClick={sendScore} className='p-2 border-2 border-emerald-500 hover:cursor-pointer'> Publish score</button>
        </div>

        <div className="p-5">
          <table className="min-w-[500px] w-full shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left w-[70%]">Name</th>
                <th className="py-3 px-4 text-left w-[30%]">Score</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((data, index) => (
                <tr 
                  key={index} 
                  className={`
                    ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    hover:bg-blue-50 transition-colors
                  `}
                >
                  <td className="py-2 px-4 border-b border-gray-200">
                    {data?.name || "Anonymous"}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 font-semibold text-gray-800">
                    {data.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
