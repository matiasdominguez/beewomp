import React, { useState } from 'react';
import useSound from 'use-sound';
import { useLocation, useHistory } from 'react-router-dom';
import './index.css';

import laughTrack1 from '../../../sounds/laugh-track-1.mp3';
import booWomp from '../../../sounds/boo-womp.mp3';

import Footer from '../../footer';
import SoundButton from '../../sound-button';
import { usePrevious } from '../../../utils/hooks';

const Home = ({ user, firebase }) => {
  const { pathname } = useLocation();
  const history      = useHistory();

  const hasJoinedRoom = pathname !== '/';
  const roomId        = hasJoinedRoom && pathname.replace('/','')

  const [activeSounds, setActiveSounds] = useState([]);
  const [roomToJoin, setRoomToJoin]     = useState('');

  const handleChangeRoomToJoin = ({ target: { value: updatedRoomToJoin } }) => {
    setRoomToJoin(updatedRoomToJoin);
  }

  const handleClickJoinRoom = () => {
    history.push(roomToJoin)
  }

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
      console.log('Playing sound: laughTrack1')
      playLaughTrack1()
    }
    if (lastSoundTriggered === 'booWomp') {
      console.log('Playing sound: booWomp')
      playBooWomp()
    }
  }

  if (hasJoinedRoom) {
    return (
      <div className="page-home">
        <div className="page-home-container">
          {JSON.stringify({ activeSounds, roomId })}
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
  } else {
    return (
      <div className="page-home">
        <div className="page-home-container">
          <input
            type="text"
            value={roomToJoin}
            placeholder={'Enter room id.'}
            onChange={handleChangeRoomToJoin}
          />
          <button
            className="page-home-join-room-btn"
            disabled={roomToJoin.length === 0}
            onClick={handleClickJoinRoom}
          >
            Join Room
          </button>
        </div>
        <Footer firebase={firebase} user={user} />
      </div>
    );
  }
};

export default Home;
