import { CalendarProvider } from "./context";
import CalendarContainer from "./containers/Calendar";

import "./App.css";

function App() {
  return (
    <div className="App">
      <CalendarProvider>
        <CalendarContainer />
      </CalendarProvider>
    </div>
  );
}

export default App;
