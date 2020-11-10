import { useReducer, createContext } from "react";
import { addMonths } from "date-fns";

let reducer = (state, action) => {
  switch (action.type) {
    case "ADD_REMINDER":
      return {
        ...state,
        reminders: [...state.reminders, action.payload.reminder],
      };
    case "REMOVE_REMINDER":
      return {
        ...state,
        reminders: state.reminder.filter(
          (o) => o.id !== action.payload.reminderId
        ),
      };
    case "REMOVE_ALL_REMINDER":
      return { ...state, reminders: [] };
    case "NEXT_DATE":
      return { ...state, currentDate: addMonths(state.currentDate, -1) };
    case "PREVIOUS_DATE":
      return { ...state, currentDate: addMonths(state.currentDate, 1) };
    case "IS_ADDING_REMINDER":
      return { ...state, isAddingReminder: action.payload.isAddingReminder };
    default:
      return;
  }
};

const initialState = {
  reminders: [],
  currentDate: new Date(),
  isAddingReminder: false,
};
const CalendarContext = createContext(initialState);

function CalendarProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CalendarContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CalendarContext.Provider>
  );
}
export { CalendarContext, CalendarProvider };
