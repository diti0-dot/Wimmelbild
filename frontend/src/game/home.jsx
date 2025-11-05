import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import aladdin from '../assets/aladdin.png';
import ducks from '../assets/ducks.png';
import puss from '../assets/puss.png';
import rapunzel from '../assets/rap.png';
import xmark from '../assets/xmark.png';
import demo from '../assets/demo.gif';
const backendUrl = import.meta.env.VITE_BACKEND_URL;


export default function Home(){
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    // Fetch scores from backend
    useEffect(() => {
        async function fetchScores() {
            try {
                const response = await fetch(`${backendUrl}/user`)
                if (!response.ok) {
                    throw new Error('Failed to fetch scores')
                }
                const data = await response.json()
                setUsers(data)
            } catch (err) {
                setError(err.message)
                console.error('Error fetching scores:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchScores()
    }, [])

    const goToPlay = () => {
        navigate('/play')
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    const characters = [
        { name: 'Aladdin', image: aladdin },
        { name: 'Ugly Ducklings', image: ducks },
        { name: 'Puss in Boots', image: puss },
        { name: 'Rapunzel', image: rapunzel },
        { name: 'X Marks the Spot', image: xmark }
    ]

    return(
        <div className="home-container">
            <div className="home-card">
                {/* Header Section */}
                <div className="home-header">
                    <h1 className="home-title">Where are the characters?</h1>
                    <h2 className="home-subtitle">Wimmelbild</h2>
                </div>

                {/* Characters Section */}
                <div className="home-section">
                    <h2 className="section-title">Find These Characters</h2>
                    <div className="characters-grid">
                        {characters.map((character, index) => (
                            <div key={index} className="character-card">
                                <img 
                                    src={character.image} 
                                    alt={character.name}
                                    className="character-image"
                                />
                                <p className="character-name">{character.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* How to Play Section */}
                <div className="home-section">
                    <h2 className="section-title">How to Play</h2>
                    <div className="how-to-play">
                        <p className="instruction">1. Click on the image to make your guess</p>
                        <img src={demo} alt="demo"/>
                        <p className="instruction">2. Select the character from the dropdown</p>
                        <p className="instruction">3. Find all characters as fast as you can!</p>
                        <button className="nav-btn" onClick={goToPlay}>Start Finding Now</button>
                    </div>
                </div>

                {/* Score Board Section */}
                <div className="home-section">
                    <h2 className="section-title">Score Board</h2>
                    <p className="challenge-text">Can you make it into the Top 10?</p>
                    
                    {loading && <p className="loading-text">Loading scores...</p>}
                    
                    {error && (
                        <p className="error-text">Error loading scores: {error}</p>
                    )}
                    
                    {!loading && !error && (
                        <>
                            {users.length === 0 ? (
                                <p className="no-scores-text">No scores yet. Be the first to play!</p>
                            ) : (
                                <table className="score-table">
                                    <thead>
                                        <tr className="table-header-row">
                                            <th className="table-header">Rank</th>
                                            <th className="table-header">Player</th>
                                            <th className="table-header">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) => (
                                            <tr 
                                                key={user.id} 
                                                className="table-row"
                                                style={{
                                                    backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white'
                                                }}
                                            >
                                                <td className="table-cell">{index + 1}</td>
                                                <td className="table-cell">{user.name}</td>
                                                <td className="table-cell">{formatTime(user.timing)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}