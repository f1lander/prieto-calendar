import { useContext, useLayoutEffect, useState } from "react";

import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  isWeekend,
} from "date-fns";

import { CalendarContext } from "../context";

import CreateReminder from "./CreateReminder";

import CellDay from "../components/CellDay";
import { Container } from "../components/utils/commonComponents";

function WeekDays(props) {
  const { state, dispatch } = useContext(CalendarContext);

  const { currentDate, currentReminder } = state;

  const [cellDays, setCellDays] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOnClick = (event, reminder) => {
    event.stopPropagation(); 
    setAnchorEl(event.currentTarget);
    dispatch({ type: "SET_REMINDER", payload: reminder });
  };

  const handleClose = () => {
    setAnchorEl(null);
    //dispatch({ type: "IS_ADDING_REMINDER", payload: false });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
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

    const monthDays = eachDayOfInterval({
      start: startOfMonthDay,
      end: endOfMonthDay,
    }).map((item) => ({
      inCurrentMonth: true,
      date: item,
      holiday: isWeekend(item),
    }));
    setCellDays([...firstBlanksCells, ...monthDays, ...lastBlanksCells]);
  }, [currentDate]);

  return (
    <Container wrap>
      {cellDays.map((item) => (
        <CellDay onClick={handleOnClick} {...item} />
      ))}
      {open && (
        <CreateReminder
          reminder={currentReminder}
          id={id}
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      )}
    </Container>
  );
}

export default WeekDays;
