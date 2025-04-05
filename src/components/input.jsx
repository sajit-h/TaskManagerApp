import React from 'react'

function Input({value,onChange,placeholder ,type}) {
  return (
    <div className='w-[100%] h-[90%]  flex items-center'>
        <input 
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
        />
    </div>
  )
}

export default Input;