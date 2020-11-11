import { useContext, useState } from "react";
import styled, { css } from "styled-components";
import { CirclePicker } from "react-color";
import { Popover, TextField, Button, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { CalendarContext } from "../context";
import { Container } from "../components/utils/commonComponents";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "50ch",
  },
}));
function CreateReminder(props) {
  const classes = useStyles();
  const { dispatch } = useContext(CalendarContext);

  const { open, id, anchorEl, handleClose, reminder } = props;

  const [newReminder, setNewReminder] = useState(reminder || {});
  const [error, setError] = useState(false);

  const handleOnSave = () => {
    debugger;
    const nonValidated = Object.keys(newReminder).some(
      (key) => !newReminder[key]
    );

    if (!nonValidated) {
      setError(false);
      dispatch({
        type: "ADD_REMINDER",
        payload: {
          ...newReminder,
          date: `${newReminder.date} ${newReminder.time}`,
        },
      });
      handleClose();
    } else {
      setError(true);
    }
  };
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <div className={classes.root}>
        <Container column>
          <TextField
            id="standard-full-width"
            label="Title"
            className={classes.textField}
            placeholder="Title"
            fullWidth
            margin="normal"
            value={newReminder.title}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              setNewReminder({ ...newReminder, title: e.target.value })
            }
          />
          <TextField
            label="Description"
            id="margin-none"
            className={classes.textField}
            placeholder="Description"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={newReminder.description}
            onChange={(e) =>
              setNewReminder({ ...newReminder, description: e.target.value })
            }
          />
          <TextField
            label="City"
            id="margin-dense"
            className={classes.textField}
            placeholder="San Pedro Sula, Cortes"
            fullWidth
            margin="normal"
            value={newReminder.city}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              setNewReminder({ ...newReminder, city: e.target.value })
            }
          />
          <TextField
            label="Date"
            id="margin-normal"
            className={classes.textField}
            placeholder="21/01/2020"
            margin="normal"
            type="date"
            value={newReminder.date}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              setNewReminder({ ...newReminder, date: e.target.value })
            }
          />
          <TextField
            label="Time"
            id="margin-normal"
            className={classes.textField}
            placeholder="10:00 AM"
            margin="normal"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            value={newReminder.time}
            onChange={(e) =>
              setNewReminder({ ...newReminder, time: e.target.value })
            }
          />

          <ActionButtons column justify="center">
            <CirclePicker
              style={{ margin: "0 auto" }}
              color={newReminder.color}
              onChangeComplete={(color) =>
                setNewReminder({ ...newReminder, color: color.hex })
              }
            />
          </ActionButtons>
          <ActionButtonsContainer>
            <ActionButtons>
              <Button
                color="secondary"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_ALL_REMINDER",
                    payload: newReminder,
                  })
                }
              >
                Delete All
              </Button>
            </ActionButtons>
            <ActionButtons end>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Box pl={1} />
              <Button variant="outlined" color="primary" onClick={handleOnSave}>
                Save
              </Button>
            </ActionButtons>
          </ActionButtonsContainer>
          {error && (
            <ErrorLabel variant="caption">
              Please select all the fields
            </ErrorLabel>
          )}
        </Container>
      </div>
    </Popover>
  );
}

export default CreateReminder;

const ErrorLabel = styled(Typography)`
  color: red;
  text-align: end;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  flex: 1;
  justify-content: ${({ end }) => (end ? "flex-end" : "flex-start")};
  align-items: center;
  padding: 1rem;
  ${({ justify }) =>
    justify &&
    css`
      justify-content: ${justify};
    `}
`;

const ActionButtonsContainer = styled(Container)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
