import React, { useState, useRef, useEffect } from 'react'
import '../AudioPlayer/AudioPlayer.css'
import {GrBackTen} from "react-icons/gr"
import {GrForwardTen} from "react-icons/gr"
import {BsPlayBtn} from "react-icons/bs"
import {BsPauseBtn} from "react-icons/bs"
import Grace from '../Data/Sermons/Grace_Verite.mp3'



function AudioPlayer() {
  //useState
const [isPlaying, setIsPlaying] = useState(false);

const [duration, setDuration] = useState(0);

const [currentTime, setCurrentTime] = useState(0);

//useReference
const audioPlayer = useRef() //audio component

const progressBar = useRef() // reference progressbar

const animationRef = useRef() //reference de l'animation

useEffect(()=>{
  const seconds = Math.floor(audioPlayer.current.duration);
  setDuration(seconds);
  progressBar.current.max = seconds;

}, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

const calculateTime =(secs) =>{
  const minutes = Math.floor(secs / 60);

  const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  const seconds = Math.floor(secs % 60);

  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${returnedMinutes}:${returnedSeconds}`; 
}
const togglePlayPause = () =>{
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if(!prevValue){
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    }else{
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
}

const whilePlaying = () =>{
  progressBar.current.value = audioPlayer.current.currentTime;
  changePlayerCurrentTime();
  animationRef.current = requestAnimationFrame(whilePlaying)
}

const changeRange = () => {
  audioPlayer.current.currentTime = progressBar.current.value;
  changePlayerCurrentTime();
}

const changePlayerCurrentTime = () =>{
  progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
  setCurrentTime(progressBar.current.value);
}

const backTen = () =>{
  progressBar.current.value = Number(progressBar.current.value - 10);
  changeRange();
}

const forwardTen =() =>{
  progressBar.current.value = Number(progressBar.current.value + 10);
  changeRange();
}
  return (
    <div className='box'>
      <div className='boxInfo'>
        <div className='info'>
        <p><span>Date :</span></p>
        <p><span>Titre :</span></p>
        <p><span>Prédicateur :</span></p>
        <p><span></span></p>          
        </div>
      </div>
      <div className="audioplayer">
        <audio ref={audioPlayer} src={Grace} preload='metadata'></audio>
        
        
        

        {/*progress bar*/}
        <input type="range" className='progressBar' defaultValue={0} ref={progressBar} onChange={changeRange}/>
        
        <div className="time">
          <div>
              {/*current time */}
            <div className='currentTime'>{calculateTime(currentTime)}</div>
          </div>
          <div>
            {/*duration*/}
            <div className='duration'>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
          </div>
            
        </div>

        <div className="playPBF">
            <button className='forwardBackward' onClick={backTen}><GrBackTen /></button>
            <button onClick={togglePlayPause} className='playPause'>
                {isPlaying ? <BsPauseBtn /> : <BsPlayBtn /> }
            </button>
            <button className='forwardBackward' onClick={forwardTen}><GrForwardTen/></button>
        </div>
  </div>
    </div>
  
  )
}

export default AudioPlayer
 