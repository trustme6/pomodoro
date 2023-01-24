import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Buttons } from './components/Buttons';
import { Timer } from './components/timer';
export const TimerMode = {
  pomodoro: 'pomodoro',
  break: 'break',
  longBreak: 'longBreak',
};
const myStorage = window.localStorage;

const StyledApp = styled.div<{ isPomodoro: boolean; isBreak: boolean }>`
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

const pomodoroCountLs = localStorage.getItem('iq');

export function App() {
  const [{ timerMode, pomodoroCount }, setPomodoroState] = React.useState({
    timerMode: TimerMode.pomodoro,
    pomodoroCount: Number(pomodoroCountLs),
  });
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
    if (timerMode === TimerMode.pomodoro) {
      myStorage.setItem('iq', `${pomodoroCount + 1}`);

      setPomodoroState((state) => {
        return {
          pomodoroCount: state.pomodoroCount + 1,
          timerMode:
            (state.pomodoroCount + 1) % 4 === 0
              ? TimerMode.longBreak
              : TimerMode.break,
        };
      });
    } else {
      setPomodoroState((state) => {
        return {
          pomodoroCount: state.pomodoroCount,
          timerMode:
            state.timerMode === TimerMode.pomodoro
              ? TimerMode.break
              : TimerMode.pomodoro,
        };
      });
    }

    pauseTimer();
  };
  const skipPomodoroCount = () => {
    const test = 'Do you want to refresh the pomodoro count?';
    if (confirm(test)) {
      myStorage.setItem('iq', `0`);

      setPomodoroState((state) => {
        return {
          pomodoroCount: 0,
          timerMode: state.timerMode,
        };
      });
    }
  }

  useEffect(() => {
    setSeconds(
      timerMode === TimerMode.pomodoro
        ? 60 * 25
        : timerMode === TimerMode.longBreak
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
    function keyDown(event) {
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
      isPomodoro={timerMode === TimerMode.pomodoro}
      isBreak={timerMode === TimerMode.break}
    >
      <Wrapper>
        <Timer value={seconds} />
        <Buttons
          isTimerStarted={isTimerStarted}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          skipTimer={skipTimer}
          isPomodoro={timerMode === TimerMode.pomodoro}
        />
      </Wrapper>
      <PomodoroCountWrapper onClick={() => skipPomodoroCount()}>
        #{pomodoroCount}
      </PomodoroCountWrapper>
    </StyledApp>
  );
}

export default App;
