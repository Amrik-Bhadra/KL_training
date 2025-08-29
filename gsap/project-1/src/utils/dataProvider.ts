export const timelineControls = [
  {
    method: '.play()',
    description: 'Plays the timeline from its current position'
  },
  {
    method: '.pause()',
    description: 'Pauses the timeline.'
  },
  {
    method: '.restart()',
    description: 'Jumps back to the beginning and plays from there.'
  },
  {
    method: '.seek(time)',
    description: 'Jumps to a specific time (in seconds) in the timeline without playing. For example, tl.seek(1.5) jumps to the 1.5-second mark.'
  },
  {
    method: '.timeScale(speed)',
    description: 'Changes the playback speed. tl.timeScale(2) plays at double speed, while tl.timeScale(0.5) plays in slow motion.'
  },
  {
    method: '.reverse()',
    description: 'Plays the timeline backward from its current position'
  }
];
