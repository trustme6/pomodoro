import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Buttons } from './components/Buttons';
import { Timer } from './components/timer';

export enum ETimerMode {
  pomodoro = 'pomodoro',
  break = 'break',
  longBreak = 'longBreak',
};

const myStorage = window.localStorage;

const StyledApp = styled.div<{
  isPomodoro: boolean;
  isBreak: boolean;
}>`
  background: ${(props) => {
    return props.isPomodoro
      ? `rgb(186, 73, 73)`
      : props.isBreak
      ? `rgb(56, 133, 138)`
      : `rgb(57, 112, 151)`;
  }};

  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  transition: background 300ms ease;
`;
const PomodoroCountWrapper = styled.div`
  color: white;
  cursor: pointer;
  user-select: none;
  display: inline-block;
  font-size: 16px;
  opacity: 0.6;
  margin-bottom: 4px;

  :hover {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px 0px 30px;
  border-radius: 6px;

  @font-face {
    font-family: 'ArialRounded';
    src: local('ArialRounded'), url('/unicode.arialr.ttf');
  }
  font-family: 'ArialRounded';
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 20px;
  width: 400px;
`;

const TimerModeButton = styled.button<{ isActive: boolean }>`
  background: ${(p) => (p.isActive ? 'red' : 'blue')};
  display: flex;
  text-align: center;
  font-size: 11px;
  padding: 2px 12px;
  height: 28px;
  cursor: pointer;
`;

const pomodoroCountLs = localStorage.getItem('iq');

export function App() {
  const [timerMode, setTimerMode] = React.useState(ETimerMode.pomodoro);
  const [pomodoroCount, setPomodoroCount] = React.useState(
    Number(pomodoroCountLs)
  );
  const [seconds, setSeconds] = React.useState(60 * 25);
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timer | undefined>(
    undefined
  );

  const isTimerStarted = intervalId !== undefined;

  const startTimer = () => {
    if (!isTimerStarted) {
      const newIntervalId = setInterval(
        () => setSeconds((value) => value - 1),
        10
      );

      setIntervalId(newIntervalId);
    }
  };

  const pauseTimer = () => {
    clearTimeout(intervalId);
    setIntervalId(undefined);
  };

  const skipTimer = () => {
    if (timerMode === ETimerMode.pomodoro) {
      myStorage.setItem('iq', `${pomodoroCount + 1}`);

      const nextPomodoroCount = pomodoroCount + 1;

      setPomodoroCount(nextPomodoroCount);
      setTimerMode(
        nextPomodoroCount % 4 === 0 ? ETimerMode.longBreak : ETimerMode.break
      );
    } else {
      setTimerMode(ETimerMode.break);
    }

    pauseTimer();
  };

  const skipPomodoroCount = () => {
    const test = 'Do you want to refresh the pomodoro count?';
    if (confirm(test)) {
      myStorage.setItem('iq', `0`);

      setPomodoroCount(0);
    }
  };

  const validateAndSetTimerMode = (mode: ETimerMode) => {
    if (isTimerStarted) {
      if (confirm('ty durak?')) {
        setTimerMode(mode);
        pauseTimer();
      }
    } else {
      setTimerMode(mode);
    }
  };
  validateAndSetTimerMode('pidor')

  useEffect(() => {
    setSeconds(
      timerMode === ETimerMode.pomodoro
        ? 60 * 25
        : timerMode === ETimerMode.longBreak
        ? 60 * 15
        : 60 * 5
    );
  }, [timerMode]);

  useEffect(() => {
    if (seconds === 0 && isTimerStarted) {
      skipTimer();
    }
  }, [seconds, isTimerStarted]);

  useEffect(() => {
    function keyDown(event: KeyboardEvent) {
      if (event.code === 'Enter') {
        if (isTimerStarted) {
          pauseTimer();
        } else if (!isTimerStarted) {
          startTimer();
        }
      }
    }

    document.addEventListener('keydown', keyDown);

    return () => {
      document.removeEventListener('keydown', keyDown);
    };
  }, [isTimerStarted]);

  return (
    <StyledApp
      isPomodoro={timerMode === ETimerMode.pomodoro}
      isBreak={timerMode === ETimerMode.break}
    >
      <Wrapper>
        <div
          style={{
            display: 'flex',
          }}
        >
          <TimerModeButton
            isActive={timerMode === ETimerMode.pomodoro}
            onClick={() => validateAndSetTimerMode(ETimerMode.pomodoro)}
          >
            Pomodoro
          </TimerModeButton>
          <TimerModeButton
            isActive={timerMode === ETimerMode.break}
            onClick={() => validateAndSetTimerMode(ETimerMode.break)}
          >
            Short break
          </TimerModeButton>
          <TimerModeButton
            isActive={timerMode === ETimerMode.longBreak}
            onClick={() => validateAndSetTimerMode(ETimerMode.longBreak)}
          >
            Long break
          </TimerModeButton>
        </div>
        <Timer value={seconds} />
        <Buttons
          isTimerStarted={isTimerStarted}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          skipTimer={skipTimer}
          isPomodoro={timerMode === ETimerMode.pomodoro}
        />
      </Wrapper>
      <PomodoroCountWrapper onClick={() => skipPomodoroCount()}>
        #{pomodoroCount}
      </PomodoroCountWrapper>
    </StyledApp>
  );
}

export default App;
