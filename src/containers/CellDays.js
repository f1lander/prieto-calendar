import { useContext, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import {
  addDays,
  subDays,
  format,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";

import { CalendarContext } from "../context";

function WeekDays(props) {
  const { state } = useContext(CalendarContext);
  const { currentDate, reminders } = state;

  useLayoutEffect(() => {
    debugger;
    //fill first blanks
    const startOfMonthDay = startOfMonth(currentDate);
    const endOfMonthDay = endOfMonth(currentDate);

    const startOfWeekDay = startOfWeek(startOfMonthDay);
    const endOfWeekDay = endOfWeek(endOfMonthDay);

    const firstBlanksCells = eachDayOfInterval({
      start: startOfWeekDay,
      end: startOfMonthDay,
    }).filter((date) => date < startOfMonthDay);
    const lastBlanksCells = eachDayOfInterval({
      start: endOfMonthDay,
      end: endOfWeekDay,
    }).filter((date) => date > endOfMonthDay);

    console.log("first", firstBlanksCells);
    console.log("last", lastBlanksCells);
  }, [currentDate]);

  return (
    <Container>
      <h1>elooooooo</h1>
    </Container>
  );
}

// Array.from(Array(7)).map((e, i) => (
//     <DayCell notMonthDay>{format(addDays(firstDOW, i), "EEEE")}</DayCell>
//   ));

const DayCell = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: auto;
  justify-content: flex-start;
  width: 300px;
  height: 300px;
  background-color: #f26627;
  color: ${({ notMonthDay }) => (notMonthDay ? "gray" : "white")};
`;

const Container = styled.div`
  display: flex;
`;

export default WeekDays;
