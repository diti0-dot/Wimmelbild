import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home(){
    const [name, setName] = useState("")
    const navigate = useNavigate()
    const goToPlay=()=>{
        navigate('/play');

    }


    return(
        <div className="home_card">
            <h1>Where's Waldo</h1>
      <button className="nav_btn" onClick={goToPlay}>Find now</button>

            <div>
                <h2>Score Board</h2>
                {/*list of players and their score*/}
            </div>
        </div>
        
    )
}