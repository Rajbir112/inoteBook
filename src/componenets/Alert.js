import React,{useContext} from 'react'
import alertContext from '../contex1/notes/alertContext';
const Alert = () => {
  let context = useContext(alertContext);
  let {alert} = context
  const capitalize = (word) =>{
        const lower = word.toLowerCase()
        return lower.charAt(0).toUpperCase() + lower.slice(1)
    }  
  return (
    <div style={{height:'40px',transition: 'height 0.3s'}}>
     { alert && (
      <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capitalize(alert.type)}</strong> {alert.content}
      </div>
    )}
    </div>
  );

}

export default Alert
