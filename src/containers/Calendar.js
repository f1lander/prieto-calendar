import { useContext } from "react";
import { Paper, Box } from "@material-ui/core";
import styled from "styled-components";
import { CalendarContext } from "../context";
import CalendarHeader from "./Header";
import WeekDays from "./WeekDays";
import CellDays from "./CellDays";
import { Container } from "../components/utils/commonComponents";

const Calendar = (props) => {
  const { state } = useContext(CalendarContext);

  return (
    <PaperContainer elevation={3}>
      <Container column>
        <CalendarHeader currentDate={state.currentDate} />
        <WeekDays />
        <CellDays />
      </Container>
    </PaperContainer>
  );
};

export default Calendar;

const PaperContainer = styled(Paper)`
  margin: calc(100% / 17);
`;
