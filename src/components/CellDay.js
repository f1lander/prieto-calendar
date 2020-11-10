import { useContext } from "react";
import styled from "styled-components";
import { ButtonBase, Drawer } from "@material-ui/core";
import { getDate } from "date-fns";
import { CalendarContext } from "../context";

function CellDay(props) {
  const { date } = props;
  const { state, dispatch } = useContext(CalendarContext);
  const { isAddingReminder } = state;
  const handleOnClick = () => {
    dispatch({ type: "IS_ADDING_REMINDER", payload: true });
  };
  return (
    <>
      <CellButton onClick={handleOnClick}>
        <DayLabel>{getDate(date)}</DayLabel>
      </CellButton>
      <Drawer anchor="top" open={isAddingReminder}>
        <h1> eloooou </h1>
      </Drawer>
    </>
  );
}

export default CellDay;

const DayLabel = styled.div`
  text-align: start;
`;

const CellButton = styled(ButtonBase)`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: auto;
  justify-content: flex-start;
  width: 300px;
  height: 300px;
  background-color: ${({ holiday }) => holiday && "gray"};
  color: ${({ inCurrentMonth }) => (inCurrentMonth ? "white" : "gray")};
`;
