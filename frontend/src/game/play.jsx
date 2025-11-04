import { useState } from 'react';
import characters from '../assets/characters.png';
import beach from '../assets/image.png';



export default function Play() {
    const [showDropdown, setShowDropdown] = useState(false)
    const [showTargetBox, setShowTargetBox] = useState(false)
     const [clickPos, setClickPos] = useState({ x: 0, y: 0 });
     const [selectedCharacter, setSelectedCharacter] = useState(""); 


    function handleClick(event) {
  const rect = event.target.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // convert to percentages
  const xPercent = (x / rect.width) * 100;
  const yPercent = (y / rect.height) * 100;
    setClickPos({ x, y });  
    setShowDropdown(true); 
    setShowTargetBox(true)
  console.log("Normalized:", xPercent.toFixed(2), yPercent.toFixed(2));
 
}
function handleCharacterClick(character) {
  if (!character) return;

  console.log("User selected:", character);
  console.log("Click position (percent):", clickPos.xPercent, clickPos.yPercent);

  setShowDropdown(false);
  setSelectedCharacter("");
  setShowTargetBox(false)
}



  return (
    <div>
      <h2>Find the following characters</h2>
      <div style={{display:'flex'}}>
      <img src={characters} alt="characters" />
      <h1>Timer:</h1>
      </div>
    <div className="beach" style={{ position: "relative", display: "inline-block" }}>
  <img src={beach} alt="beach" onClick={handleClick} />

  {showTargetBox && (
    <div style={{
      position: "absolute",
      top: clickPos.y,
      left: clickPos.x,
      width: "60px",
      height: "60px",
      border: "2px dashed red",
      borderRadius: "12px",
      backgroundColor: "rgba(255, 255, 0, 0.3)",
      transform: "translate(-50%, -50%)",
      pointerEvents: "none",
    }} />
  )}

  {showDropdown && (
    <div style={{
      position: "absolute",
      top: clickPos.y + 70, // offset below box
      left: clickPos.x,
      background: "white",
      border: "1px solid black",
      transform: "translateX(-50%)",
      zIndex: 10,
    }}>
     <select
  value={selectedCharacter}
  onChange={(e) => {
    const character = e.target.value;
    setSelectedCharacter(character);        // save selection
    handleCharacterClick(character);        // immediately handle click
  }}
>
  <option value="Odlaw">Odlaw</option>
  <option value="Wizard Whitebeard">Wizard Whitebeard</option>
  <option value="Wilma">Wilma</option>
  <option value="Woof">Woof</option>
  <option value="Waldo">Waldo</option>
</select>
    </div>
  )}
</div>

    </div>
  );
}
