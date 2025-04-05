import React from 'react'

function Button({text,onClick,type,className,onSubmit}) {
  return (
        <>
        <button 
        onClick={onClick}
        type={type}
        onSubmit={onSubmit}
        className={className}>{text}
      
        </button>
        </>
  )
}

export default Button