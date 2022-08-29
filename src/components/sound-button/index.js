import React from 'react';
import './index.css';

const SoundButton = ({
  label,
  soundId,
  onClickPlay
}) => {
  return (
    <div
      className="sound-button"
      onClick={() => onClickPlay(soundId)}
    >
      {label}
    </div>
  )
};

export default SoundButton;