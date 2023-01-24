import styled from "styled-components";

function formatNumber(number:number) {
  return number < 10 ? `0${number}` : number;
}

const Wrapper = styled.div`
  color: white;
  font-size: 100px;
  line-height: 100px;
  font-weight: bold;
`;

export function Timer(props: { value: number }) {
  const minutes = formatNumber(parseInt(`${props.value / 60}`));
  const seconds = formatNumber(props.value % 60);

  return (
    <Wrapper>
      {minutes}:{seconds}
    </Wrapper>
  );
}
