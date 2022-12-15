import { RouterProvider } from "react-router-dom";
import MERNRoutes from "./components/Routes/Routes";
import Provider from "./components/Provider/Provider";
function App() {
  return (
    <div className="App">
      <Provider>
        <MERNRoutes />
      </Provider>
    </div>
  );
}
export default App;
