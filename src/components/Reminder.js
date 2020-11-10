import { Typography } from "@material-ui/core";
import styled from "styled-components";
import { Typography } from "@material-ui/core";

function Reminder(props) {
  const { reminder } = props;

  return (
    <Container>
      <Reminder>
        <TagColor color={reminder.tagColor} />
        <Label>{reminder.title}</Label>
      </Reminder>
    </Container>
  );
}

export default Reminder;

const TagColor = styled.div`
  background-color: ${({ color }) => color};
`;

const Label = styled(Typography)`
  background-color: ${({ tagColor }) => tagColor};
`;
const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
