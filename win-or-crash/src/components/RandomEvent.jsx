import React, { useState } from 'react';

// --- Event Data Array ---
// Define your list of possible events as objects.
const eventPrompts = [
    {
        id: 1,
        type: "Crisis",
        title: "⚠️ Alien Invasion",
        description: "A hostile alien fleet has appeared and is bombarding the capital city!",
        effect: "Major production halt and a 50% resource drain for the next three turns.",
    },
    {
        id: 2,
        type: "Economic",
        title: "📉 Stock Market Crash",
        description: "Global uncertainty has caused massive panic selling.",
        effect: "All investment funds lose 20% value.",
    },
    {
        id: 3,
        type: "Opportunity",
        title: "🔬 Technological Breakthrough",
        description: "Your scientists have successfully harnessed fusion power!",
        effect: "Energy production doubles permanently.",
    },
    {
        id: 4,
        type: "Crisis",
        title: "🦠 Plague Outbreak",
        description: "A mysterious and fast-spreading illness is sweeping through the populace.",
        effect: "Population growth temporarily stops and worker morale drops.",
    },
    {
        id: 5,
        type: "Economic",
        title: "💰 Gold Rush Discovered",
        description: "A massive, easily accessible mineral deposit has been found in the northern territories.",
        effect: "Immediate injection of high value resources.",
    },
];
// ------------------------

export default function RandomEvent() {
    // State to hold the current random event object
    // Initialize it to null or an empty default event
    const [currentEvent, setCurrentEvent] = useState(null);

    // Function to select a random event from the array
    const generateRandomEvent = () => {
        // 1. Calculate a random index based on the array length
        const randomIndex = Math.floor(Math.random() * eventPrompts.length);
        
        // 2. Select the event at the random index
        const newEvent = eventPrompts[randomIndex];
        
        // 3. Update the state, triggering a re-render
        setCurrentEvent(newEvent);
    };

    return (
        <div style={{ padding: '30px', maxWidth: '600px', margin: '20px auto', fontFamily: 'Arial, sans-serif', border: '2px solid #333', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
            <h2 style={{ textAlign: 'center', color: '#1a1a1a' }}>Random Event Generator</h2>

            {/* Button to trigger a new random event */}
            <button 
                onClick={generateRandomEvent} 
                style={{ 
                    width: '100%', 
                    padding: '12px', 
                    fontSize: '16px', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    marginBottom: '20px'
                }}
            >
                Trigger Random Event
            </button>
            
            {/* Conditional Rendering: Display event details only if one has been generated */}
            {currentEvent ? (
                <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '4px', backgroundColor: 'white' }}>
                    <h3 style={{ marginTop: '0', color: currentEvent.type === 'Crisis' ? 'red' : currentEvent.type === 'Opportunity' ? 'green' : 'blue' }}>
                        {currentEvent.title}
                    </h3>
                    <p>
                        **Context:** {currentEvent.description}
                    </p>
                    <p>
                        **Outcome:** <strong style={{ fontWeight: 'bold' }}>{currentEvent.effect}</strong>
                    </p>
                </div>
            ) : (
                <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#666' }}>
                    No event currently active. Click the button above to start a scenario!
                </p>
            )}
        </div>
    );
}