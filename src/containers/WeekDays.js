import { useContext } from "react";
import styled from "styled-components";
import {
  addDays,
  format,
  startOfWeek,
} from "date-fns";

import { CalendarContext } from "../context";

function WeekDays(props) {
  const { state } = useContext(CalendarContext);
  const { currentDate } = state;
  const firstDOW = startOfWeek(currentDate);
  return (
    <Container>
      {Array.from(Array(7)).map((e, i) => (
        <WeekDayCell>{format(addDays(firstDOW, i), "EEEE")}</WeekDayCell>
      ))}
    </Container>
  );
}

const WeekDayCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  background-color: #f26627;
  color: white;
`;

const Container = styled.div`
  display: flex;
`;

export default WeekDays;
