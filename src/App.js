import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  // Color distribution and reward multipliers
  const rewardMultipliers = {
    red: 1.2,
    yellow: 3,
    blue: 4,
    green: 5,
  };

  const [colorBlocks, setColorBlocks] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [stake, setStake] = useState(0);
  const [randomNumber, setRandomNumber] = useState(null);
  const [result, setResult] = useState("");
  const [reward, setReward] = useState(0);

  useEffect(() => {
    assignColors();
  }, []);

  // Assign colors based on the distribution
  const assignColors = () => {
    const numbers = Array.from({ length: 50 }, (_, i) => i + 1);
    let colors = Array(30).fill("red")
      .concat(Array(12).fill("yellow"))
      .concat(Array(6).fill("blue"))
      .concat(Array(2).fill("green"));

    // Shuffle numbers and assign colors
    numbers.sort(() => 0.5 - Math.random());
    colors.sort(() => 0.5 - Math.random());

    const colorAssignment = numbers.map((number, index) => ({
      number,
      color: colors[index],
    }));

    setColorBlocks(colorAssignment);
  };

  // Spin the wheel and generate a random number between 1 and 50
  const spin = () => {
    if (!selectedColor || stake <= 0) {
      alert("Please select a color and enter a valid stake amount.");
      return;
    }

    const generatedNumber = Math.floor(Math.random() * 50) + 1;
    setRandomNumber(generatedNumber);

    const chosenBlock = colorBlocks.find((block) => block.number === generatedNumber);

    if (chosenBlock && chosenBlock.color === selectedColor) {
      const wonReward = stake * rewardMultipliers[selectedColor];
      setReward(wonReward);
      setResult(`Congrats! You won with ${chosenBlock.color}. Your number was ${generatedNumber}.`);
    } else {
      setReward(0);
      setResult(`Sorry, you lost. Your number was ${generatedNumber}, but it wasn't ${selectedColor}.`);
    }
  };

  return (
    <div className="App">
      <h1>Gambling Game</h1>

      

      {/* Display grid of 50 blocks */}
      <div className="block-grid">
        {colorBlocks.map((block) => (
          <div key={block.number} className={`block ${block.color}`}>
            {block.number}
          </div>
        ))}
      </div>

      {/* Input for staking */}
      <div className="stake-input">
        <label>Stake Amount: </label>
        <input
          type="number"
          value={stake}
          onChange={(e) => setStake(Number(e.target.value))}
        />
      </div>

      {/* Color selection buttons */}
      <div className="color-buttons">
        <button
          className={`color-btn red ${selectedColor === "red" ? "selected" : ""}`}
          onClick={() => setSelectedColor("red")}
        >
          Red(1.2x)
        </button>
        <button
          className={`color-btn yellow ${selectedColor === "yellow" ? "selected" : ""}`}
          onClick={() => setSelectedColor("yellow")}
        >
          Yellow(3x)
        </button>
        <button
          className={`color-btn blue ${selectedColor === "blue" ? "selected" : ""}`}
          onClick={() => setSelectedColor("blue")}
        >
          Blue(4x)
        </button>
        <button
          className={`color-btn green ${selectedColor === "green" ? "selected" : ""}`}
          onClick={() => setSelectedColor("green")}
        >
          Green(5x)
        </button>
      </div>
      {/* Reward Multiplier Table */}
      {/*
      <h2>Reward Multiplier Table</h2>
      <table>
        <thead>
          <tr>
            <th>Color</th>
            <th>Multiplier</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rewardMultipliers).map(([color, multiplier]) => (
            <tr key={color}>
              <td>{color.charAt(0).toUpperCase() + color.slice(1)}</td>
              <td>{multiplier}x</td>
            </tr>
          ))}
        </tbody>
      </table>
      */}


      {/* Spin button */}
      <div className="spin-area">
        <button onClick={spin}>Spin</button>
        {randomNumber && <p>Random Number: {randomNumber}</p>}
        {result && <p>{result}</p>}
        {randomNumber && <p>Your Reward: ${reward}</p>}
      </div>
    </div>
  );
};

export default App;
