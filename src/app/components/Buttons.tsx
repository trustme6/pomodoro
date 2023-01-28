import React from 'react';
import styled from 'styled-components';
import { TimerMode } from '../app';
import { NextIcon } from './icons/NextIcon';

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

const Wrapper = styled.div`
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

const StartButton = styled(Button)`
  box-shadow: rgb(235 235 235) 0px 6px 0px;
`;

const PauseButton = styled(Button)`
  margin-top: 20px;
  transition: transform, 300ms, ease;
  transform: translate3d(0px, 6px, 0px);
`;

interface IProps {
  isPomodoro: boolean;
  pauseTimer: () => void;
  startTimer: () => void;
  skipTimer: () => void;
  isTimerStarted: boolean;
}

export const Buttons: React.FC<IProps> = ({
  isPomodoro,
  pauseTimer,
  startTimer,
  skipTimer,
  isTimerStarted,
}) => {
  return (
    <Wrapper>
{isTimerStarted ? (
        <PauseButton isPomodoro={isPomodoro} onClick={() => pauseTimer()}>
          pause
        </PauseButton>
      ) : (
        <StartButton isPomodoro={isPomodoro} onClick={() => startTimer()}>
          start
        </StartButton>
      )}

      {isTimerStarted && (
        <SkipButton onClick={() => skipTimer()}>
          <NextIcon />
        </SkipButton>
      )}
    </Wrapper>
  );
};
