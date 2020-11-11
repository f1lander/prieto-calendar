import styled from "styled-components";

function WeekDays(props) {
  const { day } = props;
  return <WeekDayCell>{day}</WeekDayCell>;
}
const WeekDayCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: calc(100% / 7);
  width: calc(100% / 7);
  background-color: #EE4540;
  color: white;
  padding: 0.3rem;
`;

export default WeekDays;
