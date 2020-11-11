import { Box, ButtonBase, Typography } from "@material-ui/core";
import styled from "styled-components";

function Reminder(props) {
  const { onClick, reminder } = props;

  const { title, time, color } = reminder;

  return (
    <Container onClick={(e) => onClick(e, reminder)} color={color}>
      <Typography variant="caption">{title}</Typography>
      <Box pl={1} />
      <Typography variant="caption">{time}</Typography>
    </Container>
  );
}

export default Reminder;

const Container = styled(ButtonBase)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  background-color: ${({ color }) => color || "#bedadc"};
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  margin-bottom: 0.3rem;
`;
