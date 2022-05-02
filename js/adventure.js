////////////////////////////////////////////////////////////////////////////////
// Room navigation logic
////////////////////////////////////////////////////////////////////////////////

var current_room = 'start';

const rooms = {
    start: {
        description: "It is time. You need to go home and get your passport. You get into your car, put on your seatbelt, and turn on the ignition.",
        directions: {
            happy: {location: "music", description: "Despite everything you're feeling happy. You're one of the lucky ones that can get out."},
            sad: {location: "music", description: "You're going to miss your friends and family when you leave. But you've got to go on now and hope they will make it."},
            anger: {location: "crash", description: "It's not fair that you have to leave. You slam down on the accelerator, speed through a corner and lose control of your car."},
            fear: {location: "crash", description: "You're worried that you're not going to make it home in time. You slam down on the accelerator, speed through a corner and lose control of your car."},
            disgust: {location: "music", description: "You are appalled that you've been forced into this situation."},
        },
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Toyota_iQ_014.JPG",
        image_attribution: '<a href="https://commons.wikimedia.org/wiki/File:Toyota_iQ_014.JPG">Tennen-Gas</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons'
    },
    crash: {
        description: "You feel the world jerk and then spin. Another car has crashed into you tipping your car over. You lose conciousness...",
        end: true,
        image: "https://upload.wikimedia.org/wikipedia/commons/5/52/Car_Crash_7-1-18_2246_%2842450607644%29.jpg",
        image_attribution: '<a href="https://commons.wikimedia.org/wiki/File:Car_Crash_7-1-18_2246_(42450607644).jpg">Charles Edward Miller from Chicago, United States</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0">CC BY-SA 2.0</a>, via Wikimedia Commons'
    },
    music: {
        description: "Your mind is rushing through all the details of escape as you drive towards your house. The radio starts blaring Taylor Swift's 'Shake it Off'.",
        directions: {
            happy: {location: "home", description: "You forget about your troubles and give into the music. After a special announcement plays on the radio. “Riots have broken out in Main Street.” You change your route to take the backstreets home."},
            sad: {location: "home", description: "The situation is terrible and a pop song won't change that, but you're too deflated to change the station. After the song finally ends a special announcement plays on the radio. “Riots have broken out in Main Street.” You change your route to take the backstreets home."},
            anger: {location: "traffic", description: "This is the third time you've heard this song today! You slam the radio's power button and the music stops."},
            fear: {location: "traffic", description: "You can't let the music divert your thoughts, you turn it off to think through everything."},
            disgust: {location: "traffic", description: "Urgh, what a tacky pop song. You switch the radio off and the music stops."},
        },
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Autoradio_panasonic.jpg",
        image_attribution: '<a href="https://commons.wikimedia.org/wiki/File:Autoradio_panasonic.jpg">Zoidy at German Wikipedia</a>, Public domain, via Wikimedia Commons'
    },
    traffic: {
        description: "You turn down Main Street and see chaos. Parked cars are on fire, people are breaking through shop windows and looting. A car swerves in front of you.",
        directions: {
            happy: {location: "crash", description: "You know things will work out and you stay the course."},
            sad: {location: "crash", description: "So this is it."},
            anger: {location: "crash", description: "You slam your hand on the horn and yell at the driver."},
            fear: {location: "home", description: "You slam the breaks and spin the steering wheel as hard as you can. You narrowly avoid the other car, and turn down a backstreet to get home."},
            disgust: {location: "crash", description: "What pathetic driving. You look the other driver in the eye and say “Really?”"},
        },
        image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/MPOTY_2015_No_More_-_car_on_fire.jpg",
        image_attribution: '<a href="https://commons.wikimedia.org/wiki/File:MPOTY_2015_No_More_-_car_on_fire.jpg">U.S. Air Force photo by Staff Sgt. Kenny Holston</a>, Public domain, via Wikimedia Commons'
    },
    home: {
        description: "The rest of the drive is uneventful and you make it back to your house. You get to the front door and see that it's been broken into. You can hear someone moving about inside.",
        directions: {
            happy: {location: "stolen", description: "You know you can work this out with the burglars. You open the door and call inside if everything is okay."},
            sad: {location: "stolen", description: "There's no point in going in there. You sit down on the pavement in front of your house."},
            anger: {location: "passport", description: "You shout at the burglars and tell them to get out of here."},
            fear: {location: "stolen", description: "Your too worried to go inside, and turn around to hide in the car."},
            disgust: {location: "passport", description: "You yell at the burglars telling you what you think of them."},
        },
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Broken_door_handle_%283960754933%29.jpg",
        image_attribution: '<a href="https://commons.wikimedia.org/wiki/File:Broken_door_handle_(3960754933).jpg">Colin Knowles from Vancouver</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0">CC BY-SA 2.0</a>, via Wikimedia Commons'
    },
    stolen: {
        description: "The burglar comes running through the front door at full speed and knocks you over. By the time you get up they are long gone. You head to your bedroom but your drawer is empty; your passport and cash has been stolen. There's no way you can get out in time.",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/af/Side_table_drawer.jpg",
        image_attribution: '<a href="https://commons.wikimedia.org/wiki/File:Side_table_drawer.jpg">Aral Balkan from Brighton, United Kingdom</a>, <a href="https://creativecommons.org/licenses/by/2.0">CC BY 2.0</a>, via Wikimedia Commons',
        end: true
    },
    passport: {
        description: "The burglar is frightened by your screams and runs out the back door. You go inside and fetch your passport from your side table. You drive on to the airport and catch your flight out of the country. You're safe.",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/12/Plane-in-flight.jpg",
        image_attribution: 'User: Nils at  wikivoyage shared, CC BY-SA 1.0 <https://creativecommons.org/licenses/by-sa/1.0>, via Wikimedia Commons',
        end: true
    }
   };

emotion_color = {
    "": "#000000",
    happy: '#f8edcc',
    sad: '#0071b6',
    anger: '#8a0508',
    fear: '#d6ccc6',
    disgust: '#7a9703'
}

emotion_name = {
    "": "...",
    happy: 'happy',
    sad: 'sad',
    anger: 'anger',
    fear: 'fear',
    disgust: 'disgust'
}


function show_room(new_room, emotion="", pre_text="") {
    current_room = new_room;
    room_data = rooms[current_room];
    document.getElementById('emotion').innerText = emotion_name[emotion];
    document.getElementById('emotion').setAttribute('style', 'color:' + emotion_color[emotion]);
    document.getElementById('pre-description').innerText = pre_text;
    document.getElementById('description').innerText = room_data.description;
    document.getElementById('scene-image').src = room_data.image;

    if (room_data.end) {
        document.getElementById('upload-label').innerText = "Game over. Reload the page to play again.";
        document.getElementById('image-file').setAttribute('disabled', true);

    }
}

function move_room(emotion) {
    next_room_data = rooms[current_room].directions[emotion];
    show_room(next_room_data.location, emotion, next_room_data.description);
}

window.onload = function() {
    show_room('start');
}



////////////////////////////////////////////////////////////////////////////////
// File Handling Logic
////////////////////////////////////////////////////////////////////////////////

const classificationEndpoint = "https://hf.space/embed/edwardjross/fastai_emotion_classifier/+/api/predict/"

function dataUrlFromFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result);
        };
        reader.readAsDataURL(file);
    });
}

// Send the image to the server for classification
function classifyImage(dataUrl) {
    const jsonData = {"data": [dataUrl]}
    const jsonDataString = JSON.stringify(jsonData);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const request = new Request(classificationEndpoint, {
        method: 'POST',
        headers: headers,
        body: jsonDataString
    });
    return fetch(request).then(response => response.json());
}

function getPredictionLabel(file) {
    return dataUrlFromFile(file).then(dataUrl => classifyImage(dataUrl)).then(response => response.data[0].label);
}

// When an image is selected, update the UI and get the prediction
const selectElement = document.getElementById('image-file');
selectElement.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        const file = files[0];
        // TODO: Don't open image twice
        dataUrlFromFile(file).then(dataUrl => { document.getElementById('upload-preview').src = dataUrl; });
        getPredictionLabel(file).then(label => {
            console.log(label);
            move_room(label);
            });
        }
    });