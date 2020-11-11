import { useReducer, createContext } from "react";
import { addMonths, subMonths } from "date-fns";

const defaultReminder = {
  title: null,
  description: null,
  date: null,
  time: null,
  color: "#607d8b",
  city: null,
};

let reducer = (state, action) => {
  switch (action.type) {
    case "SET_REMINDER":
      const reminder = action.payload || defaultReminder;
      return {
        ...state,
        currentReminder: reminder,
      };
    case "ADD_REMINDER":
      debugger;
      return {
        ...state,
        reminders: [...state.reminders, action.payload],
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
      return { ...state, currentDate: addMonths(state.currentDate, 1) };
    case "PREVIOUS_DATE":
      return { ...state, currentDate: subMonths(state.currentDate, 1) };
    case "IS_ADDING_REMINDER":
      return { ...state, isAddingReminder: action.payload };
    default:
      return;
  }
};

const initialState = {
  reminders: [],
  currentDate: new Date(),
  isAddingReminder: false,
  currentReminder: null,
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
