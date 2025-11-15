import React, { useState } from 'react';

// --- Event Data Array ---

export default function RandomEvent() {
    // Define your list of possible events as objects.
    const eventPrompts = [
        {
            id: 1,
            type: "Crisis",
            title: "Alien Invasion",
            description: "A hostile alien fleet has appeared and is bombarding the capital city!",
        },
        {
            id: 2,
            type: "Economic",
            title: "Stock Market Crash",
            description: "Global uncertainty has caused massive panic selling.",
        },
        {
            id: 3,
            type: "Opportunity",
            title: "Technological Breakthrough",
            description: "Your scientists have successfully harnessed fusion power!",
        },
        {
            id: 4,
            type: "Crisis",
            title: "Plague Outbreak",
            description: "A mysterious and fast-spreading illness is sweeping through the populace.",
        },
        {
            id: 5,
            type: "Economic",
            title: "Gold Rush Discovered",
            description: "A massive, easily accessible mineral deposit has been found in the northern territories.",
        },
        {
            id: 6,
            type: "Opportunity",
            title: "New Planet Discovered",
            description: "A mysterious planet is discovered and scientists found out there is an abundance of resources."
        },
        {
            id: 7,
            type: "Crisis",
            title: "Zombie Invasion",
            description: "Armies of zombies are attacking random parts of the world."
        },
        {
            id: 8,
            type: "Crisis",
            title: "War",
            description: "A war has broken out and posed a great risk to human lives."
        },
        {
            id: 9,
            type: "Economic",
            title: "Stock Market Boom",
            description: "Global certainty has caused massive surge in the markets."
        },
        {
            id: 10,
            type: "Crisis",
            title: "Housing Crisis",
            description: "All housing around the world has dropped in price and the economy is at risk."
        },
        {
            id: 11,
            type: "Opportunity",
            title: "Global Baby Boom",
            description: "A huge surge in birth rates leads to greater demands in the markets."
        },
        {
            id: 12,
            type: "Crisis",
            title: "Thanos arrived",
            description: "Thanos has come to hunt for a mysterious stone, leading the world into chaos."
        },
        {
            id: 13,
            type: "Opportunity",
            title: "Alienware Technology landed",
            description: "A huge supply of alienware technology has randomly landed around the world."
        },
        {
            id: 14,
            type: "Economic",
            title: "Medical Breakthrough",
            description: "Advances in medicine lead to a breakthrough that is revolutionary around the world."
        },
        {
            id: 15,
            type: "Crisis",
            title: "Robot invasion",
            description: "Robot are invading this world and attempt to take over humanity."
        },   
    ];
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

            <button className="buttonEvent" onClick={generateRandomEvent} >
                Trigger Random Event
            </button>
            
            {/* Conditional Rendering: Display event details only if one has been generated */}
            {currentEvent ? (
                <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '4px', backgroundColor: 'white' }}>
                    <h3 style={{ marginTop: '0', color: currentEvent.type === 'Crisis' ? 'red' : currentEvent.type === 'Opportunity' ? 'green' : 'blue' }}>
                        <div>
                            {currentEvent.title}
                            <p>
                                {currentEvent.description}
                            </p>
                        </div>
                    </h3>
                </div>
            ) : (
                <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#666' }}>
                    No event currently active. Click the button above to start a scenario!
                </p>
            )}
        </div>
    );
}