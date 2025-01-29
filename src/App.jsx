import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import UserProvider from "./users/providers/UserProvider";
import SnackbarProvider from "./providers/SnackbarProvider";
import { MenuProvider } from "./layout/header/menu/MenuProvider"

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <UserProvider>
          <MenuProvider> {/* ✅ Wrap everything inside MenuProvider */}
            <Router />
          </MenuProvider>
        </UserProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
