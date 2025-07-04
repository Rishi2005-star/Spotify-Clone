console.log("welcome to spotify");
let songIndex=0;
let audioElement=new Audio('song.mp3');

let masterPlay= document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let songName=Array.from(document.getElementsByClassName('songName'));
let songs=[
    {songName: "Talk a little same" , filepath: "song1.mp3" , coverpath:""},
    {songName: "Give you my name  " , filepath: "song2.mp3" , coverpath:"songbackground.jpg"},
    {songName: "In tune kally maze" , filepath: "song3.mp3" , coverpath:"songbackground.jpg"},
    {songName: "Constaller Fourene" , filepath: "song4.mp3" , coverpath:"songbackground.jpg"},
    {songName: "Modiee 8AM kiname " , filepath: "song5.mp3" , coverpath:"songbackground.jpg"},
    
]

// Select all elements that will display song names
let songNameElements = Array.from(document.getElementsByClassName('songName'));

// Populate each element with the corresponding song name
songNameElements.forEach((element, i) => {
    if (songs[i]) {
        element.innerText = songs[i].songName;
    }
});
//Handle play/pause click
masterPlay.addEventListener('click' , ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }
})


//Listen to events
audioElement.addEventListener('timeupdate' , ()=>{
    console.log('timeupdate');
    //Calculate progress
    let progress= parseInt((audioElement.currentTime /  audioElement.duration )*100);
    //myProgressBar.value=progress;
    //Update Seekbar
    
} )

myProgressBar.addEventListener('change' , ()=>{
    audioElement.currentTime= myProgressBar.value * audioElement.duration/100;
})

// Function to make all play buttons go back to play state
const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('fa-circle-pause')).forEach((el) => {
        el.classList.remove('fa-circle-pause');
        el.classList.add('fa-circle-play');
    });
};

Array.from(document.getElementsByClassName('fa-circle-play')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        const clickedId = parseInt(e.target.id); // ID from icon

        // If clicked on currently playing song, toggle play/pause
        if (songIndex === clickedId && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
        } else {
            // New song clicked
            songIndex = clickedId;
            audioElement.src = songs[songIndex].filepath;
            audioElement.currentTime = 0;
            audioElement.play();

            // Update play/pause icons
            makeAllPlay();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');

            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
    });
});

audioElement.addEventListener('ended', () => {
    makeAllPlay();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
});

