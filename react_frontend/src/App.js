import React from "react";
import "./App.css";
import { Allcontain } from "./Component";
import { FormProvider } from "./GlobalState";

function App() {
  return (
    <div >
      <FormProvider>
        <Allcontain/>
      </FormProvider>
    </div>
  );
}

export default App;
