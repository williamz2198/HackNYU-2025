import React, { useState } from 'react';

// --- Event Data Array ---

export default function RandomEvent(props) {
    // Define your list of possible events as objects.
    const eventPrompts = [
        {
            id: 1,
            effect: "negative",
            stock: "healthcare",
            title: "Zombie Concern",
            description: "There's been a rumor that people are slowly turning into zombies. People want to quickly find the medicine and go into quarantine. However, the truth of this rumor is not confirmed...",
            afterwards: "Turns out, it was a false alarm. People from CrazyVille just decided to dress up as zombies for Halloween. People have wasted money on unnecessary healthcare supplies and there is a lot of public backlash."
        },
        {
            id: 2,
            effect: "positive",
            stock: "travel socialmedia",
            title: "Popstar Fans",
            description: "A well-known popstar is visiting from another country and EVERYONE heard about it. Tickets are selling out fast from all over the country!",
            afterwards: "The popstar's visit was a huge success! Fans flocked to see them perform, boosting local businesses and creating a vibrant atmosphere in the city."
        },
        {
            id: 3,
            effect: "negative",
            stock: "materials socialmedia",
            title: "Jewlery Hype",
            description: "A new style has appeared throughout social media. People are trying to wear the most jewlery possible to show off their popularity.",
            afterwards: "The jewlery trend has died down as quickly as it started. People realized that comfort and practicality were more important than flashy accessories."
        },
        {
            id: 4,
            effect: "negative",
            stock: "socialmedia technology",
            title: "Influencer Controversy",
            description: "A popular influencer has been caught in a scandal talking about how AI is stealing their data that has everyone talking. People are worried about their privacy online.",
            afterwards: "The controversy has blown over as quickly as it started. People have become more cautious about their online presence, but the influencer has lost a significant portion of their following."
        },
        {
            id: 5,
            effect: "neutral",
            stock: "materials energy",
            title: "New Rush Discovered",
            description: "A massive, easily accessible mineral deposit has been found in the northern territories. This deposit contains a new material that reduces energy consumption significantly.",
            afterwards: "The mineral deposit has been successfully mined and is now being used in various industries. While has been a huge success, people are needing less energy now."
        },
        {
            id: 6,
            effect: "positive",
            stock: "food healthcare",
            title: "Miracle Fish Discovered",
            description: "A new type of fish has been discovered that feeds families for weeks with just one catch but also extremely difficult to catch.",
            afterwards: "The miracle fish has become a staple in diets around the world. Its abundance and nutritional value have helped combat hunger and malnutrition in many communities."
        },
    ];

    const [currentEvent, setCurrentEvent] = useState(null);
    const [count, setCount] = useState(0);
    const [afterwards, setAfterwards] = useState("");

    // Function to select a random event from the array
    const generateRandomEvent = () => {
        if(currentEvent!=null){
            setAfterwards(currentEvent.afterwards);
        }
        const randomIndex = Math.floor(Math.random() * eventPrompts.length);
        let oldEvent = currentEvent;
        let newEvent = eventPrompts[randomIndex];
        while(oldEvent==newEvent){
            newEvent = eventPrompts[randomIndex];
        }
        // 3. Update the state, triggering a re-render
        if(count < 24){
            setCurrentEvent(newEvent);
            props.onCall(count);
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
                            <div>{afterwards}</div>
                            <br/>
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