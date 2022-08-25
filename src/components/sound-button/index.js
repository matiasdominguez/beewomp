import React from 'react';

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

export default SoundButton;