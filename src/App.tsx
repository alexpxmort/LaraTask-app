
import { ThemeProvider } from "styled-components";
import { AuthContextProvider } from "./contexts/auth.context";
import RouterX from "./routes/routerX"
import   "./styles.scss";
import theme from "./theme/theme";

function App() {

  return (
   <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <RouterX/>
      </AuthContextProvider>
   </ThemeProvider>
  )
}

export default App
