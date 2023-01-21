import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NextIcon } from './components/icons/NextIcon';
import { Timer } from './components/timer';
const TimerMode = {
  pomodoro: 'pomodoro',
  break: 'break',
  longBreak: 'longBreak',
};
const myStorage = window.localStorage;

const dick = 'хуй';
const ass = 'жопа';

/* мой хуй у тебя в жопа
console.log("мой"+ " " + dick + " "+ "у"+ "тебя в "  + ass);
console.log(`мой ${dick} у тебя в ${ass}`)*/

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

const Buttons = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
`;
const Button = styled.button<{ isPomodoro: boolean }>`
  cursor: pointer;
  border: none;
  margin: 20px 0px 0px;
  padding: 0px 12px;
  border-radius: 4px;
  font-size: 22px;
  font-family: 'ArialRounded', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  color: ${(props) =>
    props.isPomodoro ? `rgb(186, 73, 73)` : `rgb(56, 133, 138)`};
  font-weight: bold;
  background-color: white;
  transition: color 0.5s ease-in-out 0s;
  text-transform: uppercase;
  height: 55px;
  width: 200px;

  :focus {
    border: 2px solid green;
  }
`;
const pomodoroCountLs = localStorage.getItem('iq');

const StartButton = styled(Button)`
  box-shadow: rgb(235 235 235) 0px 6px 0px;
`;
const PauseButton = styled(Button)`
  margin-top: 20px;
  transition: transform, 300ms, ease;
  transform: translate3d(0px, 6px, 0px);
`;
const SkipButton = styled.button`
  position: absolute;
  background: none;
  right: 20px;
  height: 55px;
  margin-top: 26px;
  border: none;
  font-weight: bold;
  font-size: 22px;
  cursor: pointer;

  svg {
    color: white;
  }
`;

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
      myStorage.setItem('iq',`${pomodoroCount + 1}` );


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
  function skipPomodoroCount() {
    const test = 'Do you want to refresh the pomodoro count?';
    if (confirm(test)) {
      myStorage.setItem('iq',`0` );

      setPomodoroState((state) => {
        return {
          pomodoroCount: 0,
          timerMode: state.timerMode

        };
      });
    }
  };

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
        {' '}
        <Timer value={seconds} />
        <Buttons>
          {isTimerStarted ? (
            <PauseButton
              isPomodoro={timerMode === TimerMode.pomodoro}
              onClick={() => pauseTimer()}
            >
              pause
            </PauseButton>
          ) : (
            <StartButton
              isPomodoro={timerMode === TimerMode.pomodoro}
              onClick={() => startTimer()}
            >
              start{' '}
            </StartButton>
          )}

          {isTimerStarted && (
            <SkipButton onClick={() => skipTimer()}>
              <NextIcon />
            </SkipButton>
          )}
        </Buttons>
      </Wrapper>
      <PomodoroCountWrapper onClick={() => skipPomodoroCount()}>
        #{pomodoroCount}
      </PomodoroCountWrapper>
    </StyledApp>
  );
}

export default App;
