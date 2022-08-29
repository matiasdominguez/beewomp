import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import './index.css';
import toast from 'react-hot-toast';

import laughTrack1 from '../../../sounds/laugh-track-1.mp3';
import booWomp from '../../../sounds/boo-womp.mp3';

import Footer from '../../footer';
import SoundButton from '../../sound-button';
import { usePrevious } from '../../../utils/hooks';

const DEFAULT_SOUND_LENGTH_RULE = 5;

const toastOptions = {
  style: {
    border: '1px solid #ffc048',
    color: '#ffc048',
    backgroundColor: '#1e272e'
  }
}

const soundIcon = {
  'laughTrack1': '😂',
  'booWomp': '😢'
}

const soundLengthRules = {
  'laughTrack1': 2
}

const Home = ({ user, firebase, setIsLoading }) => {
  const { pathname } = useLocation();

  const hasJoinedRoom = pathname !== '/';
  const roomId        = hasJoinedRoom && pathname.replace('/','')

  const database = firebase.database();

  const username = user.displayName || 'Guest'

  const handleUpdateRoomState = ({ roomState, key }) => {
    if (roomState === null) {
      const newRoom = database.ref(`/${key}`);

      newRoom
        .set({
          triggeredBy: username,
          sound:       ''
        })
        .then(() => {});
    }
    setRoomState(roomState);
  }

  const assignRoomStateUpdateEvent = () => {
    const roomRef = database.ref(`/${roomId}`);

    roomRef
      .on('value', snapshot => handleUpdateRoomState({
        key: roomRef.key,
        roomState: snapshot.val()
      }));
  }

  useEffect(() => {
    if (roomId) {
      assignRoomStateUpdateEvent()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [0])

  const [activeSounds, setActiveSounds] = useState([]);
  const [roomToJoin, setRoomToJoin]     = useState('');
  const [roomState, setRoomState]       = useState({});

  const previousRoomState    = usePrevious(roomState);
  const previousActiveSounds = usePrevious(activeSounds);

  useEffect(() => {
    const soundHasBeenTriggered = previousRoomState !== roomState
    const canExtractId          = roomState?.sound && roomState.sound.includes('_')

    if (soundHasBeenTriggered && canExtractId) {
      const [soundId, timeStamp] = roomState?.sound?.split('_')
      const { triggeredBy }      = roomState

      const fiveSecondsAgo = moment().subtract(5, 'seconds')
      const whenTriggered  = moment(Number(timeStamp))

      if (triggeredBy && soundId && whenTriggered.isAfter(fiveSecondsAgo)) {
        toast(triggeredBy, { icon: soundIcon[soundId] || '🐝', ...toastOptions });

        setActiveSounds(currentActiveSounds => {
          if (currentActiveSounds && currentActiveSounds.filter(s => s === soundId).length < (soundLengthRules[soundId] || DEFAULT_SOUND_LENGTH_RULE)) {
            return [...currentActiveSounds, soundId]
          }
        });
      }
    }
  }, [previousRoomState, roomState])

  const handleChangeRoomToJoin = ({ target: { value: updatedRoomToJoin } }) => {
    setRoomToJoin(updatedRoomToJoin);
  }

  const handleClickJoinRoom = () => {
    setIsLoading(true);
    window.location.assign(`/${roomToJoin}`);
  }

  const handleOnClickPlay = soundId => {
    const stateRef = database.ref(`/${roomId}`);

    stateRef
      .set({
        triggeredBy: username,
        sound:       `${soundId}_${Date.now()}`
      })
      .then(() => {
        console.log(`Setting sound: ${soundId}`)
      })
  }

  const handleOnEnd = soundId => {
    setActiveSounds(currentActiveSounds => {
      let foundItem = false;
      let updatedActiveSounds = []

      if (currentActiveSounds) {
        for (var i = 0; i < currentActiveSounds.length; i++) {
          if (currentActiveSounds[i] === soundId && foundItem === false) {
            foundItem = true;
          } else {
            updatedActiveSounds = [...updatedActiveSounds, currentActiveSounds[i]]
          }
        }
      }

      return updatedActiveSounds
    });
  }

  const [playLaughTrack1] = useSound(laughTrack1, { onend: () => handleOnEnd('laughTrack1') });
  const [playBooWomp]     = useSound(booWomp, { onend: () => handleOnEnd('booWomp') });

  const lastSoundTriggered = activeSounds && activeSounds[activeSounds.length - 1]

  const canPlaySound = `${activeSounds}` !== `${previousActiveSounds}`
    && lastSoundTriggered
    && activeSounds.filter(
      soundId => soundId === lastSoundTriggered
    ).length < (soundLengthRules[lastSoundTriggered] || DEFAULT_SOUND_LENGTH_RULE)
    && previousActiveSounds.filter(s => s === lastSoundTriggered).length < activeSounds.filter(s => s === lastSoundTriggered).length

  if (canPlaySound) {
    if (lastSoundTriggered === 'laughTrack1') playLaughTrack1();
    if (lastSoundTriggered === 'booWomp')     playBooWomp();
  }

  if (hasJoinedRoom) {
    return (
      <div className="page-home">
        <div className="page-home-container">
          {['laughTrack1', 'booWomp'].map(soundId => (
            <SoundButton
              soundId={soundId}
              activeSounds={activeSounds}
              file={laughTrack1}
              label={soundIcon[soundId] || `${soundId}`}
              onEnd={handleOnEnd}
              onClickPlay={handleOnClickPlay}
            />
          ))}
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
