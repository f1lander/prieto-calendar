import { useContext } from "react";
import { addDays, format, startOfWeek } from "date-fns";

import { CalendarContext } from "../context";
import WeekDayCell from "../components/WeekDayCell";
import { Container } from "../components/utils/commonComponents";

function WeekDays(props) {
  const { state } = useContext(CalendarContext);
  const { currentDate } = state;
  const firstDOW = startOfWeek(currentDate);
  return (
    <Container>
      {Array.from(Array(7)).map((e, i) => (
        <WeekDayCell day={format(addDays(firstDOW, i), "EEEE")} />
      ))}
    </Container>
  );
}

export default WeekDays;
