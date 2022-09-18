import { useContext } from 'react'
import { AppContext } from 'provider'

export const useStore = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useProvider must be used within a Provider')
  }
  return context
}
