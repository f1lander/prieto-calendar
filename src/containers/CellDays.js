import { useContext, useLayoutEffect, useState } from "react";

import styled from "styled-components";
import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  isWeekend,
} from "date-fns";

import { CalendarContext } from "../context";
import CellDay from "../components/CellDay";

function WeekDays(props) {
  const { state } = useContext(CalendarContext);
  const { currentDate } = state;

  const [cellDays, setCellDays] = useState([]);

  useLayoutEffect(() => {
    const startOfMonthDay = startOfMonth(currentDate);
    const endOfMonthDay = endOfMonth(currentDate);

    const startOfWeekDay = startOfWeek(startOfMonthDay);
    const endOfWeekDay = endOfWeek(endOfMonthDay);

    const firstBlanksCells = eachDayOfInterval({
      start: startOfWeekDay,
      end: startOfMonthDay,
    })
      .filter((date) => date < startOfMonthDay)
      .map((item) => ({
        inCurrentMonth: false,
        date: item,
      }));
    const lastBlanksCells = eachDayOfInterval({
      start: endOfMonthDay,
      end: endOfWeekDay,
    })
      .filter((date) => date > endOfMonthDay)
      .map((item) => ({
        inCurrentMonth: false,
        date: item,
      }));

    const monthDays = eachDayOfInterval(startOfMonthDay, endOfMonthDay).map(
      (item) => ({
        inCurrentMonth: true,
        date: item,
        holiday: isWeekend(item),
      })
    );
    setCellDays([...firstBlanksCells, ...monthDays, ...lastBlanksCells]);
  }, [currentDate]);

  return (
    <Container>
      {cellDays.map((item) => (
        <CellDay {...item} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

export default WeekDays;
