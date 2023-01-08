import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Timer } from './components/timer';

const StyledApp = styled.div<{isPomodoro: boolean}>`
  background: ${props => props.isPomodoro ? `rgb(186, 73, 73)` : `rgb(56, 133, 138)`};
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
    
    width: 100%;

    display: flex;
  flex-direction: column;
  align-items: center;

  margin: 20px;
  width: 50%;
`;

const Buttons = styled.div`
display: flex;
justify-content: center;
width: 100%;
`;
const Button = styled.button<{isPomodoro: boolean}>`
cursor: pointer;
  border: none;
  margin: 20px 0px 0px;
    padding: 0px 12px;
    border-radius: 4px;
    font-size: 22px;
    color:${props => props.isPomodoro ? `rgb(186, 73, 73)` : `rgb(56, 133, 138)`};
    font-weight: bold;
    background-color: white;
    transition: color 0.5s ease-in-out 0s;
    text-transform: uppercase;
    height: 55px;
    width: 200px;
`

const StartButton = styled(Button)`
box-shadow: rgb(235 235 235) 0px 6px 0px;
   
`;
const PauseButton = styled(Button)`
margin-top: 26px ;
    
`
const SkipButton = styled.button`
  position: absolute;
`

export function App() {
  const [seconds, setSeconds] = React.useState(60 * 25);
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timer | undefined>(
    undefined
  );
  const [timerMode, setTimerMode] = React.useState('pomodoro');

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

  const pauseTimer = useCallback(() => {
    clearTimeout(intervalId);
    setIntervalId(undefined);
  }, [intervalId]);

  const skipTimer = useCallback(() => {
    pauseTimer();
    setTimerMode((v) => (v === 'pomodoro' ? 'break' : 'pomodoro'));
  }, [pauseTimer]);

  useEffect(() => {
    setSeconds(timerMode === 'pomodoro' ? 60 * 25 : 60 * 5);
  }, [timerMode]);

  useEffect(() => {
    if (seconds === 0 && isTimerStarted) {
      skipTimer();
    }
  }, [seconds, isTimerStarted, skipTimer]);

  return (
    <StyledApp isPomodoro={timerMode === 'pomodoro'}>
      <Wrapper>      <Timer value={seconds} />

      <Buttons>
        {isTimerStarted ? (
          <PauseButton isPomodoro={timerMode === 'pomodoro'} onClick={() => pauseTimer()}>pause</PauseButton>
        ) : (
          <StartButton isPomodoro={timerMode === 'pomodoro'} onClick={() => startTimer()}>start </StartButton>
        )}

        {isTimerStarted && <SkipButton onClick={() => skipTimer()}>skip </SkipButton>}
      </Buttons>
      </Wrapper>

    </StyledApp>
  );
}

export default App;
