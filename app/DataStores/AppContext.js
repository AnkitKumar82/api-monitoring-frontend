import React, { createContext, useState, useEffect, useContext, useRef } from 'react'
import Cookie from '../Helpers/Cookie'
import { nanoid } from 'nanoid'
import WebsiteTheme from '../Constants/WebsiteTheme'

const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    show: false,
    duration: '5000',
    severity: 'success',
    message: ''
  })

  const navbarRef = useRef(null)
  const messageTextboxRef = useRef(null)

  const [websiteTheme, setWebsiteTheme] = useState(WebsiteTheme.DEFAULT)

  return (
    <AppContext.Provider
      value={{
        alert, setAlert,
        navbarRef,
        messageTextboxRef
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useApp = () => {
  return useContext(AppContext)
}

export { AppProvider, useApp }
