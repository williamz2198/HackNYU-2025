import React, { useState } from 'react';
import zombieImage from '../assets/images/zombie.jpg'; 
import popstarImage from '../assets/images/popstar.jpg';
import jewleryImage from '../assets/images/jewlery.jpg';
import scandalImage from '../assets/images/scandal.jpg';
import mineralsImage from '../assets/images/minerals.jpg';
import fishImage from '../assets/images/fish.jpg';

// --- Event Data Array ---

export default function RandomEvent(props) {
    // Define your list of possible events as objects.
    const eventPrompts = [
        {
            id: 1,
            effect: "negative",
            stock: "HealthCare",
            title: "Zombie Concern",
            description: "There's been a rumor that people are slowly turning into zombies. People want to quickly find the medicine and go into quarantine. However, the truth of this rumor is not confirmed...",
            afterwards: "Turns out, it was a false alarm. People from CrazyVille just decided to dress up as zombies for Halloween. People have wasted money on unnecessary healthcare supplies and there is a lot of public backlash.",
            image_src: zombieImage,
        },
        {
            id: 2,
            effect: "positive",
            stock: "SocialMedia Travel",
            title: "Popstar Fans",
            description: "A well-known popstar is visiting from another country and EVERYONE heard about it. Tickets are selling out fast from all over the country!",
            afterwards: "The popstar's visit was a huge success! Fans flocked to see them perform, boosting local businesses and creating a vibrant atmosphere in the city.",
            image_src: popstarImage,
        },
        {
            id: 3,
            effect: "negative",
            stock: "Materials Socialmedia",
            title: "Jewlery Hype",
            description: "A new style has appeared throughout social media. People are trying to wear the most jewlery possible to show off their popularity.",
            afterwards: "The jewlery trend has died down as quickly as it started. People realized that comfort and practicality were more important than flashy accessories.",
            image_src: jewleryImage,
        },
        {
            id: 4,
            effect: "negative",
            stock: "SocialMedia Technology",
            title: "Influencer Controversy",
            description: "A popular influencer has been caught in a scandal talking about how AI is stealing their data that has everyone talking. People are worried about their privacy online.",
            afterwards: "The controversy has blown over as quickly as it started. People have become more cautious about their online presence, but the influencer has lost a significant portion of their following.",
            image_src: scandalImage,
        },
        {
            id: 5,
            effect: "neutral",
            stock: "Materials Energy",
            title: "New Rush Discovered",
            description: "A massive, easily accessible mineral deposit has been found in the northern territories. This deposit contains a new material that reduces energy consumption significantly.",
            afterwards: "The mineral deposit has been successfully mined and is now being used in various industries. While has been a huge success, people are needing less energy now.",
            image_src: mineralsImage,
        },
        {
            id: 6,
            effect: "positive",
            stock: "Food Healthcare",
            title: "Miracle Fish Discovered",
            description: "A new type of fish has been discovered that feeds families for weeks with just one catch but also extremely difficult to catch.",
            afterwards: "The miracle fish has become a staple in diets around the world. Its abundance and nutritional value have helped combat hunger and malnutrition in many communities.",
            image_src: fishImage,
        },
    ];

    const [currentEvent, setCurrentEvent] = useState(null);
    const [count, setCount] = useState(0);
    const [afterwards, setAfterwards] = useState("");

    // Function to select a random event from the array
    const generateRandomEvent = () => {
        let oldEventId = -1;
        if(currentEvent!=null){
            setAfterwards(currentEvent.afterwards);
            oldEventId = currentEvent.id;
        }
        let randomIndex = Math.floor(Math.random() * eventPrompts.length);
        let newEvent = eventPrompts[randomIndex];
        while(oldEventId==newEvent.id){
            randomIndex = Math.floor(Math.random() * eventPrompts.length);
            newEvent = eventPrompts[randomIndex];
        }
        
        
        // 3. Update the state, triggering a re-render
        if(count < 24){
            setCurrentEvent(newEvent);
            props.onCall(newEvent.stock,newEvent.effect);
        }
        else{
            setCurrentEvent(null);
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
                                {currentEvent.image_src && (
                                    <img
                                        src={currentEvent.image_src}
                                        alt={currentEvent.title}
                                        className="event-image"
                                        style={{
                                            width: '100%',
                                            maxWidth: '300px',
                                            height: 'auto',
                                            marginBottom: '15px',
                                            borderRadius: '8px'
                                        }}
                                    />
                                )}
                            </p>
                                {currentEvent.description}
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