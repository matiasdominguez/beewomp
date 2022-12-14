import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import './index.css';
import toast from 'react-hot-toast';
import randomMaterialColor from 'random-material-color';

import sound_laughtrack from '../../../sounds/laughtrack.mp3';
import sound_boowomp from '../../../sounds/boowomp.mp3';
import sound_mariowhoa from '../../../sounds/mariowhoa.mp3';
import sound_yes from '../../../sounds/yes.mp3';
import sound_nope from '../../../sounds/nope.mp3';
import sound_wow from '../../../sounds/wow.mp3';
import sound_yesomg from '../../../sounds/yesomg.mp3';
import sound_laughtrackmusic from '../../../sounds/laughtrackmusic.mp3';
import sound_myman from '../../../sounds/myman.mp3';
import sound_applause from '../../../sounds/applause.mp3';
import sound_claps from '../../../sounds/claps.mp3';
import sound_brb from '../../../sounds/brb.mp3';
import sound_suspense from '../../../sounds/suspense.mp3';
import sound_incorrect from '../../../sounds/incorrect.mp3';
import sound_partyblower from '../../../sounds/partyblower.mp3';
import sound_nogod from '../../../sounds/nogod.mp3';
import sound_funny from '../../../sounds/funny.mp3';
import sound_patronage from '../../../sounds/patronage.mp3';
import sound_coin from '../../../sounds/coin.mp3';
import sound_founditem from '../../../sounds/founditem.mp3';
import sound_danger from '../../../sounds/danger.mp3';
import sound_airhorn from '../../../sounds/airhorn.mp3';
import sound_youwhat from '../../../sounds/youwhat.mp3';
import sound_hurt from '../../../sounds/hurt.mp3';
import sound_notfine from '../../../sounds/notfine.mp3';
import sound_legitness from '../../../sounds/legitness.mp3';
import sound_xfiles from '../../../sounds/xfiles.mp3';
import sound_shutupmoney from '../../../sounds/shutupmoney.mp3';
import sound_morecoins from '../../../sounds/morecoins.mp3';
import sound_helloeverybody from '../../../sounds/helloeverybody.mp3';
import sound_helloquestion from '../../../sounds/helloquestion.mp3';
import sound_hellosmall from '../../../sounds/hellosmall.mp3';
import sound_alert from '../../../sounds/alert.mp3';
import sound_quack from '../../../sounds/quack.mp3';
import sound_yay from '../../../sounds/yay.mp3';
import sound_drumroll from '../../../sounds/drumroll.mp3';
import sound_nicememe from '../../../sounds/nicememe.mp3';
import sound_okaybye from '../../../sounds/okaybye.mp3';
import sound_question from '../../../sounds/question.mp3';
import sound_hoorayquestion from '../../../sounds/hoorayquestion.mp3';
import sound_overnine from '../../../sounds/overnine.mp3';
import sound_goodbye from '../../../sounds/goodbye.mp3';
//* import sound_^5 from '../../../sounds/^5.mp3';
//* import sound_^6 from '../../../sounds/^6.mp3';
//* import sound_^7 from '../../../sounds/^7.mp3';
//* import sound_^8 from '../../../sounds/^8.mp3';
//* import sound_^9 from '../../../sounds/^9.mp3';
//* import sound_# from '../../../sounds/#.mp3';

import Footer from '../../footer';
import SoundButton from '../../sound-button';
import { usePrevious } from '../../../utils/hooks';
import { containsSpecialChars } from '../../../utils/helpers';

const DEFAULT_SOUND_LENGTH_RULE = 5;
const DEFAULT_VOLUME = 40;

const CLICK_LIMIT = 2;
const CLICK_RESET_MS = 2000;

const getToastStyle = text => ({
  color: `white`,
  backgroundColor: `${randomMaterialColor.getColor({ shades: ['500'] })}`
})

const soundIcon = {
  'laughtrack': '????',
  'boowomp': '????',
  'mariowhoa': '????',
  'yes': '????',
  'nope': '????',
  'wow': '????',
  'yesomg': '??????????',
  'laughtrackmusic': '????????',
  'myman': '???????????',
  'applause': '????????',
  'claps': '????',
  'brb': '?????????????????',
  'suspense': '????????',
  'incorrect': '???????',
  'partyblower': '????',
  'nogod': '??????????',
  'funny': '????',
  'patronage': '????',
  'coin': '????',
  'founditem': '????',
  'danger': '??????',
  'airhorn': '????',
  'youwhat': '??????????',
  'hurt': '????',
  'notfine': '????????',
  'legitness': '????',
  'xfiles': '????????',
  'shutupmoney': '????',
  'morecoins': '????',
  'helloeverybody': '?????????????',
  'helloquestion': '???????',
  'hellosmall': '????',
  'alert': '????',
  'quack': '????',
  'yay': '????',
  'drumroll': '????',
  'nicememe': '????',
  'okaybye': '??????????',
  'question': '???????',
  'hoorayquestion': '???????',
  'overnine': '????',
  'goodbye': '??????',
  //* '^5': '????',
  //* '^6': '????',
  //* '^7': '????',
  //* '^8': '????',
  //* '^9': '????',
  //* '#': '????',
}

const soundLengthRules = {
  laughtrack: 4,
  laughtrackmusic: 2,
  nogod: 2,
  claps: 3,
  applause: 2,
  yay: 3,
  airhorn: 3,
  overnine: 3,
  notfine: 2,
  brb: 2,
  okaybye: 2,
  incorrect: 2,
  xfiles: 2,
  suspense: 2,
  question: 2,
  hoorayquestion: 2,
  drumroll: 2
}

const getVolumeIcon = volume => {
  if (volume === 0) return '????';
  if (volume < 40) return '????';
  if (volume < 80) return '????';
  return '????';
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
      if (!containsSpecialChars(roomId)) {
        assignRoomStateUpdateEvent()
      } else {
        setIsInvalidRoom(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [0])

  const [activeSounds, setActiveSounds]   = useState([]);
  const [roomToJoin, setRoomToJoin]       = useState('');
  const [roomState, setRoomState]         = useState({});
  const [volume, setVolume]               = useState(DEFAULT_VOLUME);
  const [isInvalidRoom, setIsInvalidRoom] = useState(false);
  const [clicks, setClicks]               = useState(0);

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
        toast(
          triggeredBy,
          {
            icon:  soundIcon[soundId] || '????',
            style: getToastStyle(username)
          }
        );

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

  const resetClicks = () => {
    setTimeout(() => {
      setClicks(0)
    }, CLICK_RESET_MS)
  }

  useEffect(() => {
    if (clicks >= CLICK_LIMIT) {
      resetClicks();
    }
  }, [clicks])

  const handleOnClickPlay = soundId => {
    if (clicks < CLICK_LIMIT) {
      setClicks(clicks => clicks + 1);

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

  const handleChangeVolume = ({ target: { value }}) => {
    setVolume(Number(value));
  }

  const [play_laughtrack] = useSound(sound_laughtrack, { volume: volume / 100, onend: () => handleOnEnd('laughtrack') });
  const [play_boowomp] = useSound(sound_boowomp, { volume: volume / 100, onend: () => handleOnEnd('boowomp') });
  const [play_mariowhoa] = useSound(sound_mariowhoa, { volume: volume / 100, onend: () => handleOnEnd('mariowhoa') });
  const [play_yes] = useSound(sound_yes, { volume: volume / 100, onend: () => handleOnEnd('yes') });
  const [play_nope] = useSound(sound_nope, { volume: volume / 100, onend: () => handleOnEnd('nope') });
  const [play_wow] = useSound(sound_wow, { volume: volume / 100, onend: () => handleOnEnd('wow') });
  const [play_yesomg] = useSound(sound_yesomg, { volume: volume / 100, onend: () => handleOnEnd('yesomg') });
  const [play_laughtrackmusic] = useSound(sound_laughtrackmusic, { volume: volume / 100, onend: () => handleOnEnd('laughtrackmusic') });
  const [play_myman] = useSound(sound_myman, { volume: volume / 100, onend: () => handleOnEnd('myman') });
  const [play_applause] = useSound(sound_applause, { volume: volume / 100, onend: () => handleOnEnd('applause') });
  const [play_claps] = useSound(sound_claps, { volume: volume / 100, onend: () => handleOnEnd('claps') });
  const [play_brb] = useSound(sound_brb, { volume: volume / 100, onend: () => handleOnEnd('brb') });
  const [play_suspense] = useSound(sound_suspense, { volume: volume / 100, onend: () => handleOnEnd('suspense') });
  const [play_incorrect] = useSound(sound_incorrect, { volume: volume / 100, onend: () => handleOnEnd('incorrect') });
  const [play_partyblower] = useSound(sound_partyblower, { volume: volume / 100, onend: () => handleOnEnd('partyblower') });
  const [play_nogod] = useSound(sound_nogod, { volume: volume / 100, onend: () => handleOnEnd('nogod') });
  const [play_funny] = useSound(sound_funny, { volume: volume / 100, onend: () => handleOnEnd('funny') });
  const [play_patronage] = useSound(sound_patronage, { volume: volume / 100, onend: () => handleOnEnd('patronage') });
  const [play_coin] = useSound(sound_coin, { volume: volume / 100, onend: () => handleOnEnd('coin') });
  const [play_founditem] = useSound(sound_founditem, { volume: volume / 100, onend: () => handleOnEnd('founditem') });
  const [play_danger] = useSound(sound_danger, { volume: volume / 100, onend: () => handleOnEnd('danger') });
  const [play_airhorn] = useSound(sound_airhorn, { volume: volume / 100, onend: () => handleOnEnd('airhorn') });
  const [play_youwhat] = useSound(sound_youwhat, { volume: volume / 100, onend: () => handleOnEnd('youwhat') });
  const [play_hurt] = useSound(sound_hurt, { volume: volume / 100, onend: () => handleOnEnd('hurt') });
  const [play_notfine] = useSound(sound_notfine, { volume: volume / 100, onend: () => handleOnEnd('notfine') });
  const [play_legitness] = useSound(sound_legitness, { volume: volume / 100, onend: () => handleOnEnd('legitness') });
  const [play_xfiles] = useSound(sound_xfiles, { volume: volume / 100, onend: () => handleOnEnd('xfiles') });
  const [play_shutupmoney] = useSound(sound_shutupmoney, { volume: volume / 100, onend: () => handleOnEnd('shutupmoney') });
  const [play_morecoins] = useSound(sound_morecoins, { volume: volume / 100, onend: () => handleOnEnd('morecoins') });
  const [play_helloeverybody] = useSound(sound_helloeverybody, { volume: volume / 100, onend: () => handleOnEnd('helloeverybody') });
  const [play_helloquestion] = useSound(sound_helloquestion, { volume: volume / 100, onend: () => handleOnEnd('helloquestion') });
  const [play_hellosmall] = useSound(sound_hellosmall, { volume: volume / 100, onend: () => handleOnEnd('hellosmall') });
  const [play_alert] = useSound(sound_alert, { volume: volume / 100, onend: () => handleOnEnd('alert') });
  const [play_quack] = useSound(sound_quack, { volume: volume / 100, onend: () => handleOnEnd('quack') });
  const [play_yay] = useSound(sound_yay, { volume: volume / 100, onend: () => handleOnEnd('yay') });
  const [play_drumroll] = useSound(sound_drumroll, { volume: volume / 100, onend: () => handleOnEnd('drumroll') });
  const [play_nicememe] = useSound(sound_nicememe, { volume: volume / 100, onend: () => handleOnEnd('nicememe') });
  const [play_okaybye] = useSound(sound_okaybye, { volume: volume / 100, onend: () => handleOnEnd('okaybye') });
  const [play_question] = useSound(sound_question, { volume: volume / 100, onend: () => handleOnEnd('question') });
  const [play_hoorayquestion] = useSound(sound_hoorayquestion, { volume: volume / 100, onend: () => handleOnEnd('hoorayquestion') });
  const [play_overnine] = useSound(sound_overnine, { volume: volume / 100, onend: () => handleOnEnd('overnine') });
  const [play_goodbye] = useSound(sound_goodbye, { volume: volume / 100, onend: () => handleOnEnd('goodbye') });
  //* const [play_^5] = useSound(sound_^5, { volume: volume / 100, onend: () => handleOnEnd('^5') });
  //* const [play_^6] = useSound(sound_^6, { volume: volume / 100, onend: () => handleOnEnd('^6') });
  //* const [play_^7] = useSound(sound_^7, { volume: volume / 100, onend: () => handleOnEnd('^7') });
  //* const [play_^8] = useSound(sound_^8, { volume: volume / 100, onend: () => handleOnEnd('^8') });
  //* const [play_^9] = useSound(sound_^9, { volume: volume / 100, onend: () => handleOnEnd('^9') });
  //* const [play_#] = useSound(sound_#, { volume: volume / 100, onend: () => handleOnEnd('#') });

  const lastSoundTriggered = activeSounds && activeSounds[activeSounds.length - 1]

  const canPlaySound = `${activeSounds}` !== `${previousActiveSounds}`
    && lastSoundTriggered
    && activeSounds.filter(
      soundId => soundId === lastSoundTriggered
    ).length < (soundLengthRules[lastSoundTriggered] || DEFAULT_SOUND_LENGTH_RULE)
    && previousActiveSounds.filter(s => s === lastSoundTriggered).length < activeSounds.filter(s => s === lastSoundTriggered).length

  if (canPlaySound) {
    if (lastSoundTriggered === 'laughtrack') play_laughtrack();
    if (lastSoundTriggered === 'boowomp') play_boowomp();
    if (lastSoundTriggered === 'mariowhoa') play_mariowhoa();
    if (lastSoundTriggered === 'yes') play_yes();
    if (lastSoundTriggered === 'nope') play_nope();
    if (lastSoundTriggered === 'wow') play_wow();
    if (lastSoundTriggered === 'yesomg') play_yesomg();
    if (lastSoundTriggered === 'laughtrackmusic') play_laughtrackmusic();
    if (lastSoundTriggered === 'myman') play_myman();
    if (lastSoundTriggered === 'applause') play_applause();
    if (lastSoundTriggered === 'claps') play_claps();
    if (lastSoundTriggered === 'brb') play_brb();
    if (lastSoundTriggered === 'suspense') play_suspense();
    if (lastSoundTriggered === 'incorrect') play_incorrect();
    if (lastSoundTriggered === 'partyblower') play_partyblower();
    if (lastSoundTriggered === 'nogod') play_nogod();
    if (lastSoundTriggered === 'funny') play_funny();
    if (lastSoundTriggered === 'patronage') play_patronage();
    if (lastSoundTriggered === 'coin') play_coin();
    if (lastSoundTriggered === 'founditem') play_founditem();
    if (lastSoundTriggered === 'danger') play_danger();
    if (lastSoundTriggered === 'airhorn') play_airhorn();
    if (lastSoundTriggered === 'youwhat') play_youwhat();
    if (lastSoundTriggered === 'hurt') play_hurt();
    if (lastSoundTriggered === 'notfine') play_notfine();
    if (lastSoundTriggered === 'legitness') play_legitness();
    if (lastSoundTriggered === 'xfiles') play_xfiles();
    if (lastSoundTriggered === 'shutupmoney') play_shutupmoney();
    if (lastSoundTriggered === 'morecoins') play_morecoins();
    if (lastSoundTriggered === 'helloeverybody') play_helloeverybody();
    if (lastSoundTriggered === 'helloquestion') play_helloquestion();
    if (lastSoundTriggered === 'hellosmall') play_hellosmall();
    if (lastSoundTriggered === 'alert') play_alert();
    if (lastSoundTriggered === 'quack') play_quack();
    if (lastSoundTriggered === 'yay') play_yay();
    if (lastSoundTriggered === 'drumroll') play_drumroll();
    if (lastSoundTriggered === 'nicememe') play_nicememe();
    if (lastSoundTriggered === 'okaybye') play_okaybye();
    if (lastSoundTriggered === 'question') play_question();
    if (lastSoundTriggered === 'hoorayquestion') play_hoorayquestion();
    if (lastSoundTriggered === 'overnine') play_overnine();
    if (lastSoundTriggered === 'goodbye') play_goodbye();
    //* if (lastSoundTriggered === '^5') play_^5();
    //* if (lastSoundTriggered === '^6') play_^6();
    //* if (lastSoundTriggered === '^7') play_^7();
    //* if (lastSoundTriggered === '^8') play_^8();
    //* if (lastSoundTriggered === '^9') play_^9();
    //* if (lastSoundTriggered === '#') play_#();
  }

  const canClickJoinRoom = roomToJoin !== ''

  if (hasJoinedRoom && !isInvalidRoom) {
    return (
      <div className="page-home">
        <div className="page-home-container">
          <div className="volume-slider">
            {getVolumeIcon(volume)}
            <input
              className="volume-slider-input"
              type="range"
              min="0"
              max="100"
              value={volume}
              step="5"
              onChange={handleChangeVolume}
            />
          </div>
          {
            [
              'hellosmall',
              'helloquestion',
              'helloeverybody',
              'yes',
              'yesomg',
              'myman',
              'nope',
              'nogod',
              'youwhat',
              'claps',
              'applause',
              'yay',
              'wow',
              'partyblower',
              'airhorn',
              'mariowhoa',
              'alert',
              'founditem',
              'funny',
              'laughtrack',
              'laughtrackmusic',
              'coin',
              'morecoins',
              'shutupmoney',
              'patronage',
              'legitness',
              'overnine',
              'hurt',
              'boowomp',
              'notfine',
              'goodbye',
              'okaybye',
              'brb',
              'incorrect',
              'xfiles',
              'suspense',
              'question',
              'quack',
              'hoorayquestion',
              'nicememe',
              'drumroll',
              'danger',
              //* '^5',
              //* '^6',
              //* '^7',
              //* '^8',
              //* '^9',
              //* '#',
              ''
            ].map(soundId => (soundId !== '' &&
              <SoundButton
                soundId={soundId}
                activeSounds={activeSounds}
                label={soundIcon[soundId] || `${soundId}`}
                onEnd={handleOnEnd}
                onClickPlay={handleOnClickPlay}
              />
            ))
          }
        </div>
        <Footer firebase={firebase} user={user} />
      </div>
    );
  } else {
    return (
      <div className="page-home">
        <div className="page-home-container">
          <input
            className="page-home-join-room-input"
            type="text"
            value={roomToJoin}
            placeholder={'Enter room id.'}
            onChange={handleChangeRoomToJoin}
          />
          <div
            className={`page-home-join-room-btn${canClickJoinRoom ? '' : '-disabled'}`}
            onClick={canClickJoinRoom ? () => handleClickJoinRoom() : () => {}}
          >
            Join Room
          </div>
        </div>
        {isInvalidRoom && <div className="invalid-room-message">Invalid Room ID: {roomId}</div>}
        <Footer firebase={firebase} user={user} />
      </div>
    );
  }
};

export default Home;
