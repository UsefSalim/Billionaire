import React from 'react'

export default function Inputs({name,title,change,type}) {
  return (
     <div className="form-group">
        <label>{title}</label>
        <input type={type} onChange={change} name={name} className="form-control" />
      </div>
  )
}
