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
            stock: "SocialMedia Travel Film",
            title: "Popstar Fans",
            description: "A well-known popstar is visiting from another country and EVERYONE heard about it. Tickets are selling out fast from all over the country!",
            afterwards: "The popstar's visit was a huge success! Fans flocked to see them perform, boosting local businesses and creating a vibrant atmosphere in the city. This popstar is even planning to be in the next big movie!",
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
            stock: "Food HealthCare",
            title: "Miracle Fish Discovered",
            description: "A new type of fish has been discovered that feeds families for weeks with just one catch but also extremely difficult to catch.",
            afterwards: "The miracle fish has become a staple in diets around the world. Its abundance and nutritional value have helped combat hunger and malnutrition in many communities.",
            image_src: fishImage,
        },
        {
            id: 7,
            effect: "positive",
            stock: "Food",
            title: "Pest Infestation",
            description: "A new insect species has been discovered in the area of nearby farms. Although they are abundant, it is unclear whether they are harmful or beneficial to crops.",
            afterwards: "The insects turned out to be beneficial, increasing the growth rate of the crops. Farmers have embraced the new species, leading to a more sustainable agricultural practice. Some even say that it makes the crops taste better.",

        },
        {
            id: 8,
            effect: "negative",
            stock: "Food HealthCare",
            title: "Strange Rainfall",
            description: "A recent thunderstorm has caused the nearby fishing lake to be colored in a strange hue. It is unknown whether this is harmful to the fish population or not.",
            afterwards: "The nearby fisherman have reported a significant decrease in their catch after the strange rainfall. Scientists later discovered that the rain had introduced harmful chemicals into the lake, affecting the fish population adversely.",

        },
        {
            id: 9,
            effect: "negative",
            stock: "Travel",
            title: "Wild Rabbits",
            description: "A population of wild rabbits has been spotted near common delivery train tracks. It is unknown whether they will cause delays or not.",
            afterwards: "The wild rabbits have caused numerous delays on the train tracks as they frequently cross the tracks, leading to safety concerns and operational disruptions. Efforts are being made to manage the rabbit population and ensure smooth train operations.",
        },
        {
            id: 10,
            effect: "positive",
            stock: "technology",
            title: "AI Upgrade",
            description: "A new Human-like AI has been developed that can perform complex tasks with ease. This AI is extrmemly intellectual and can learn new skills quickly, but people are worried about AI taking over their lives",
            afterwards: "Turns out the AI was designed to assist humans in their daily tasks, leading to increased productivity and efficiency. People have embraced the technology, finding it to be a valuable tool rather than a threat.",

        },
        {
            id: 11,
            effect: "negative",
            stock: "Film Technology",
            title: "Animation using AI",
            description: "There's been a development in the film industry where AI is being used to create animated movies. It is unclear whether these new films will be well-received by audiences or not.",
            afterwards: "People found the AI-generated animated movies to be lacking in creativity and emotional depth. Even though it had high expectations, people were not recommending these movies to others.",

        },
        {
            id: 12,
            effect: "positive",
            stock: "Film",
            title: "A New Actor",
            description: "A unknown actor has been asking to be in a major film production. It looks like they will be hired but people are unsure of their acting skills.",
            afterwards: "It turns out they had supernatural superpowers and it shocked the production team. People are excited to see their powers in the upcoming films in the future!",

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
            <h2 style={{ textAlign: 'center', color: '#1a1a1a' }}>Current Event</h2>

            <button className="buttonEvent" onClick={generateRandomEvent} >
                Next Day
            </button>
            
            {currentEvent ? (
                <div>
                    <h3 className="Text" style={{ marginTop: '0', color: currentEvent.type === 'Crisis' ? 'red' : currentEvent.type === 'Opportunity' ? 'green' : 'blue' }}>
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
                    No event currently active. Click the button above to start the next day!
                </p>
            )}
        </>
    );
}