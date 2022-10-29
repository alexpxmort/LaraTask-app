
import { AuthContextProvider } from "./contexts/auth.context";
import RouterX from "./routes/routerX"
import   "./styles.scss";

function App() {

  return (
   <AuthContextProvider>
     <RouterX/>
   </AuthContextProvider>
  )
}

export default App
