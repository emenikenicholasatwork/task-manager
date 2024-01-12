import React, { createContext, useContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({children}) => {
  const [showForm, setShowForm] = useState(false);
  const [showOverlay, setOverlay] = useState(false);
  const [home, setHome] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);
  const [incomplete, setIncomplete] = useState(false);
const [success, setSuccess] = useState(false);


const openSuccess=()=>{
  setSuccess(true)
  closeForm()
  setTimeout(()=>{
    setSuccess(false)
  },500)
}

  const toHome = () => {
    setHome(true);
  }

  const notHome = () => {
    setHome(false);
  }
  
  const toCompleted = () => {
    setCompleted(true);
  }

  const notCompleted = () => {
    setCompleted(false);
  }
  
  const toImportant = () => {
    setImportant(true);
  }

  const notImportant = () => {
    setImportant(false);
  }
  
  const toIncomplete = () => {
    setIncomplete(true);
  }

  const notIncomplete = () => {
    setIncomplete(false);
  }

  const openForm = () => {
    setOverlay(true);
    setShowForm(true);
  }
  const closeForm =() => {
    setOverlay(false);
    setShowForm(false);
  }

  return(
    <FormContext.Provider value={{
      home,
      toHome,
      notHome,
      completed,
      toCompleted,
      notCompleted,
      incomplete,
      toIncomplete,
      notIncomplete,
      important,
      toImportant,
      notImportant,
      showForm, 
      openForm, 
      closeForm,
      showOverlay,
      openSuccess,
      success,
      }}>
      {children}
    </FormContext.Provider>
  );
}

export const useForm = () => {
  return useContext(FormContext);
}