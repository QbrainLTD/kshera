import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import UserProvider from "./users/providers/UserProvider";
import SnackbarProvider from "./providers/SnackbarProvider";


function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
      <UserProvider>
        <Router />
        </UserProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
