import alertContext from "./alertContext";
import { useState } from "react";

const AlertState = (props) => {
  
   const [alert, setAlert] = useState(null)
   const showAlert = (type,content) =>{
    setAlert({
      type:  type ,
      content: content
    })
    setTimeout(() => {
      setAlert(null)
    },2000)
   } 
    return ( 
    <alertContext.Provider value={{showAlert,alert}}>
      {props.children}
    </alertContext.Provider>
  )
}

export default AlertState;
