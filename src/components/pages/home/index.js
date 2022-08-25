import React, { useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import './index.css';

import laughTrack1 from '../../../sounds/laugh-track-1.mp3';
import booWomp from '../../../sounds/boo-womp.mp3';

import Footer from '../../footer';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  },[value]); //this code will run when the value of 'value' changes
  return ref.current; //in the end, return the current ref value.
}

const SoundButton = ({
  label,
  soundId,
  onClickPlay
}) => {
  return (
    <button
      onClick={() => onClickPlay(soundId)}
    >
      {label}
    </button>
  )
};

const Home = ({ user, firebase }) => {
  const [activeSounds, setActiveSounds] = useState([]);

  const previousActiveSounds = usePrevious(activeSounds);

  const handleOnClickPlay = soundId => {
    setActiveSounds(activeSounds => {
      if (!activeSounds.includes(soundId)) {
        return [...activeSounds, soundId]
      }
      return activeSounds
    });
  }

  const handleOnEnd = soundId => {
    setActiveSounds(
      activeSounds => activeSounds.filter(activeSoundId => activeSoundId !== soundId)
    );
  }

  const [playLaughTrack1] = useSound(laughTrack1, {
    onend: () => handleOnEnd('laughTrack1')
  });

  const [playBooWomp] = useSound(booWomp, {
    onend: () => handleOnEnd('booWomp')
  });

  const lastSoundTriggered = activeSounds && activeSounds[activeSounds.length - 1]

  if (
    activeSounds && previousActiveSounds
      && !previousActiveSounds.includes(lastSoundTriggered)
  ) {
    if (lastSoundTriggered === 'laughTrack1') {
      playLaughTrack1()
    }
    if (lastSoundTriggered === 'booWomp') {
      playBooWomp()
    }
  }

  return (
    <div className="page-home">
      <div className="page-home-container">
        {JSON.stringify(activeSounds)}
        <SoundButton
          soundId={'laughTrack1'}
          activeSounds={activeSounds}
          file={laughTrack1}
          label={'😂'}
          onEnd={handleOnEnd}
          onClickPlay={handleOnClickPlay}
        />
        <SoundButton
          soundId={'booWomp'}
          activeSounds={activeSounds}
          file={booWomp}
          label={'😢'}
          onEnd={handleOnEnd}
          onClickPlay={handleOnClickPlay}
        />
      </div>
      <Footer firebase={firebase} user={user} />
    </div>
  );
};

export default Home;
