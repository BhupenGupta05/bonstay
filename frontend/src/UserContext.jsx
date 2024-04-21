import { createContext, useEffect, useState } from 'react'
import profileService from './services/profile'

export const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem('bonstay-token')
        const storedToken = JSON.parse(token)
        if (!token) {
          setUser(null)
          setIsLoading(false)
          return
        }

        // Fetch user profile using the token
        const userData = await profileService.profile(storedToken)
        // console.log(userData);
        setUser(userData)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching user profile:', error.message)
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}
