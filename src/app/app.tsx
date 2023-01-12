import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NextIcon } from './components/icons/NextIcon';
import { Timer } from './components/timer';

const StyledApp = styled.div<{ isPomodoro: boolean }>`
  background: ${(props) =>
    props.isPomodoro ? `rgb(186, 73, 73)` : `rgb(56, 133, 138)`};
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  transition: background 300ms ease;
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
`;

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
const TimerMode = {
  pomodoro: 'pomodoro',
  break: 'break',
  longBreak: 'longBreak',
};

const initialState = {
  timerMode: TimerMode.pomodoro,
  pomodoroCount: 0,
};

function reducer(state, action) {
  // if (action.type === 'INCREMENT') {
  //   return {
  //     pomodoroCount: state.pomodoroCount + 1,
  //   };
  // } else if (action.type === 'INCREMENT_AND_CHANGE') {
  //   return {
  //     pomodoroCount: state.pomodoroCount + 1,
  //     timerMode:
  //       (state.pomodoroCount + 1) % 4 === 0
  //         ? TimerMode.longBreak
  //         : TimerMode.break,
  //   };
  // } else if (action.type === 'CHANGE') {
  //   return {
  //     pomodoroCount: state.pomodoroCount,
  //     timerMode:
  //       state.timerMode === TimerMode.pomodoro
  //         ? TimerMode.break
  //         : TimerMode.pomodoro,
  //   };
  // } else {
  //   throw new Error();
  // }

  switch (action.type) {
    case 'INCREMENT_AND_CHANGE':
      return {
        pomodoroCount: state.pomodoroCount + 1,
        timerMode:
          (state.pomodoroCount + 1) % 4 === 0
            ? TimerMode.longBreak
            : TimerMode.break,
      };
    case 'CHANGE':
      return {
        pomodoroCount: state.pomodoroCount,
        timerMode:
          state.timerMode === TimerMode.pomodoro
            ? TimerMode.break
            : TimerMode.pomodoro,
      };
    default:
      throw new Error();
  }
}

export function App() {
  const [{ timerMode, pomodoroCount }, setPomodoroState] = React.useState({
    timerMode: TimerMode.pomodoro,
    pomodoroCount: 0,
  });
  const [seconds, setSeconds] = React.useState(60 * 25);
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timer | undefined>(
    undefined
  );
  // const [timerMode, setTimerMode] = React.useState(TimerMode.pomodoro);
  // const [pomodoroCount, setPomodoroCount] = React.useState(0);

  // const[{ timerMode, pomodoroCount }, dispatch] = React.useReducer(
  // reducer,
  // initialState
  // );

  const isTimerStarted = intervalId !== undefined;

  const startTimer = () => {
    if (!isTimerStarted) {
      const newIntervalId = setInterval(
        () => setSeconds((value) => value - 1),
        1000
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
      setPomodoroState((state) => {
        return {
          pomodoroCount: state.pomodoroCount + 1,
          timerMode:
            (state.pomodoroCount + 1) % 4 === 0
              ? TimerMode.longBreak
              : TimerMode.break,
        };
      });
      // dispatch({type: "INCREMENT_AND_CHANGE"})
    } else {
      // dispatch({type: "CHANGE"});
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

  return (
    <StyledApp isPomodoro={timerMode === TimerMode.pomodoro}>
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
      <div>#{pomodoroCount}</div>
    </StyledApp>
  );
}

export default App;
