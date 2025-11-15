import React, { useState } from 'react';

// --- Event Data Array ---

export default function RandomEvent(props) {
    // Define your list of possible events as objects.
    const eventPrompts = [
        {
            id: 1,
            title: "Zombie Concern",
            description: "There's been a rumor that people are slowly turning into zombies. People want to quickly find the medicine and go into quarantine.",
            afterwards: "turns out, it was a false alarm. People from CrazyVille just decided to dress up as zombies for Halloween."
        },
        {
            id: 2,
            title: "Popstar Fans",
            description: "A well-known popstar is visiting from another country and EVERYONE heard aobu",
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

    const [currentEvent, setCurrentEvent] = useState(null);
    const [count, setCount] = useState(0);

    // Function to select a random event from the array
    const generateRandomEvent = () => {
        const randomIndex = Math.floor(Math.random() * eventPrompts.length);
        const newEvent = eventPrompts[randomIndex];
        
        // 3. Update the state, triggering a re-render
        if(count < 24){
            setCurrentEvent(newEvent);
            props.onCall();
        }
        //increase count by 1 
        setCount(count + 1);
    };

    return (
        <>
            <h2 style={{ textAlign: 'center', color: '#1a1a1a' }}>Random Event Generator</h2>

            <button className="buttonEvent" onClick={generateRandomEvent} >
                Trigger Random Event
            </button>
            
            {currentEvent ? (
                <div>
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
                <p>
                    No event currently active. Click the button above to start a scenario!
                </p>
            )}
        </>
    );
}