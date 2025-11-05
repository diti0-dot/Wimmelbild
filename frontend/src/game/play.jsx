import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import main from '../assets/main.png';
import aladdin from '../assets/aladdin.png';
import ducks from '../assets/ducks.png';
import puss from '../assets/puss.png';
import rapunzel from '../assets/rap.png';
import xmark from '../assets/xmark.png';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Play() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0, xPercent: 0, yPercent: 0 });
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [feedback, setFeedback] = useState(null); 
  const [showTargetBox, setShowTargetBox] = useState(false)
  const [foundCharacters, setFoundCharacters] = useState({
    aladdin: false,
    'ugly-ducklings': false,
    'puss-in-boots': false,
    rapunzel: false,
    'x-marks-the-spot': false
  });

  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);

  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [username, setUsername] = useState("");

  // Check if all characters are found
  useEffect(() => {
    const allFound = Object.values(foundCharacters).every(Boolean);
    if (allFound) {
      setTimerActive(false);
      setShowNamePrompt(true);
    }
  }, [foundCharacters]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => setSeconds(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  function handleClick(event) {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setClickPos({ x, y, xPercent, yPercent });
    setShowDropdown(true);
    setShowTargetBox(true)
    setFeedback(null);
  }

  async function submitScore() {
    try {
      await fetch(`${backendUrl}/user_create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, timing: seconds })
      });
      setShowNamePrompt(false);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCharacterClick(character) {
    setShowDropdown(false);
    setShowTargetBox(false)

    try {
      const response = await fetch(`${backendUrl}/check_character`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: character,
          x: clickPos.xPercent,
          y: clickPos.yPercent,
        }),
      });

      const data = await response.json();

      if (data.found) {
        const id = character.replace(/\s+/g, '-');
        setFoundCharacters(prev => ({ ...prev, [id]: true }));
        setFeedback('found');
        const span = document.getElementById(`${character.replace(/\s+/g, '-')}-found`);
        if (span) span.style.visibility = 'visible';
      } else {
        setFeedback('notfound');
      }
    } catch (err) {
      console.error(err);
      setFeedback('notfound');
    }

    setSelectedCharacter('');
  }

  return (
    <div className="play-container">
      {/* Fixed Navigation Bar */}
      <div className="play-navbar">
        <div className="play-header">
          <h1 className="play-title">Find the following characters</h1>
        </div>
        
        <div className="characters-list">
          <div className="char">
            <img src={aladdin} alt="aladdin" />
            <span className="found-text" id="aladdin-found">
              FOUND!
            </span>
          </div>
          <div className="char">
            <img src={ducks} alt="ugly ducklings" />
            <span className="found-text" id="ugly-ducklings-found">
              FOUND!
            </span>
          </div>
          <div className="char">
            <img src={puss} alt="puss in boots" />
            <span className="found-text" id="puss-in-boots-found">
              FOUND!
            </span>
          </div>
          <div className="char">
            <img src={rapunzel} alt="rapunzel" />
            <span className="found-text" id="rapunzel-found">
              FOUND!
            </span>
          </div>
          <div className="char">
            <img src={xmark} alt="x marks the spot" />
            <span className="found-text" id="x-marks-the-spot-found">
              FOUND!
            </span>
          </div>
          
          <div className="timer-container">
            <div className="timer">
              Timer: {formatTime(seconds)}
            </div>
          </div>
        </div>
      </div>

      <div className="main-image-container">
        <img src={main} alt="beach" className="main-image" onClick={handleClick} />
        
        {/* Name Prompt Modal */}
        {showNamePrompt && (
          <div className="completion-modal">
            <h2 className="completion-title">You finished in {formatTime(seconds)}!</h2>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="Enter your name" 
              className="name-input"
            />
            <br />
            <button 
              onClick={submitScore}
              className="submit-btn"
            >
              Submit Score
            </button>
          </div>
        )}

        {showTargetBox && (
          <div
            className="target-box"
            style={{
              top: clickPos.y,
              left: clickPos.x,
            }}
          />
        )}
        
        {showDropdown && (
          <div
            className="dropdown-container"
            style={{
              top: clickPos.y + 70,
              left: clickPos.x,
            }}
          >
            <select
              className="character-select"
              value={selectedCharacter}
              onChange={(e) => {
                const character = e.target.value;
                setSelectedCharacter(character);
                handleCharacterClick(character);
              }}
            >
              <option value="">Select Character</option>
              <option value="rapunzel">Rapunzel</option>
              <option value="puss in boots">Puss in Boots</option>
              <option value="ugly ducklings">Ugly Ducklings</option>
              <option value="aladdin">Aladdin</option>
              <option value="x marks the spot">X Marks the Spot</option>
            </select>
          </div>
        )}

        {feedback && (
          <div
            className={`feedback-message ${feedback === 'found' ? 'feedback-found' : 'feedback-notfound'}`}
            style={{
              top: clickPos.y - 40,
              left: clickPos.x,
            }}
          >
            {feedback === 'found' ? 'Yay! You found it!' : 'Oops, try again!'}
          </div>
        )}
      </div>
    </div>
  );
}