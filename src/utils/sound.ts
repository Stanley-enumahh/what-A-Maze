// Lightweight sound effects synthesized with the Web Audio API — no
// audio files needed. One shared AudioContext, reused for every sound.
let ctx: AudioContext | null = null;

function getContext(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

interface ToneOptions {
  frequency: number;
  duration: number;
  type?: OscillatorType;
  volume?: number;
  frequencySlide?: number; // optional pitch change over the duration
}

function playTone({
  frequency,
  duration,
  type = "sine",
  volume = 0.15,
  frequencySlide,
}: ToneOptions) {
  const audioCtx = getContext();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  if (frequencySlide !== undefined) {
    osc.frequency.linearRampToValueAtTime(
      frequencySlide,
      audioCtx.currentTime + duration,
    );
  }

  gain.gain.setValueAtTime(volume, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioCtx.currentTime + duration,
  );

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function playNoiseBurst(duration: number, volume = 0.12) {
  const audioCtx = getContext();
  const bufferSize = audioCtx.sampleRate * duration;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize); // fade out
  }

  const source = audioCtx.createBufferSource();
  source.buffer = buffer;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(volume, audioCtx.currentTime);

  source.connect(gain);
  gain.connect(audioCtx.destination);
  source.start();
}

export const sound = {
  move: () =>
    playTone({ frequency: 220, duration: 0.08, type: "square", volume: 0.06 }),
  rotate: () =>
    playTone({
      frequency: 440,
      duration: 0.12,
      type: "sine",
      volume: 0.08,
      frequencySlide: 520,
    }),
  fall: () =>
    playTone({
      frequency: 300,
      duration: 0.5,
      type: "sawtooth",
      volume: 0.12,
      frequencySlide: 60,
    }),
  levelComplete: () => {
    playTone({ frequency: 523, duration: 0.15, type: "sine", volume: 0.12 });
    setTimeout(
      () =>
        playTone({
          frequency: 659,
          duration: 0.15,
          type: "sine",
          volume: 0.12,
        }),
      100,
    );
    setTimeout(
      () =>
        playTone({
          frequency: 784,
          duration: 0.25,
          type: "sine",
          volume: 0.12,
        }),
      200,
    );
  },
  win: () => {
    [523, 659, 784, 1046].forEach((freq, i) => {
      setTimeout(
        () =>
          playTone({
            frequency: freq,
            duration: 0.3,
            type: "sine",
            volume: 0.1,
          }),
        i * 120,
      );
    });
  },
  thud: () => playNoiseBurst(0.1, 0.1),
};
