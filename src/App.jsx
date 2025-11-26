import Rive from "@rive-app/react-canvas";
import { useRive, Layout, Fit } from "@rive-app/react-webgl2";
import "./App.css";

function App() {
  const { RiveComponent } = useRive({
    // Load a local riv `clean_the_car.riv` or upload your own!
    src: "/portrait.riv",
    // Be sure to specify the correct state machine (or animation) name
    stateMachines: "portrait state machine",
    // This is optional.Provides additional layout control.
    layout: new Layout({
      fit: Fit.Contain, // Change to: rive.Fit.Contain, or Cover
      layoutScaleFactor: 1,
    }),
    // Autoplay the state machine
    autoplay: true,
    // This uses the view model instance defined in Rive
    autoBind: true,
  });

  return (
    <div className="rive-container">
      <RiveComponent />
    </div>
  );
}

export default App;
