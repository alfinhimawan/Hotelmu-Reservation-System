import React from 'react'
import { createContext, useState } from 'react'

const DateContext = createContext({});

export const DateProvider = props => {

    const [date, setDate] = useState({});

    console.log(date)

  return (
    <DateContext.Provider value={{date, setDate}}>
      {props.children}
    </DateContext.Provider>
  )
}

export default DateContext;