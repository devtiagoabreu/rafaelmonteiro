'use client'

import { createContext, ReactNode } from 'react'
import toast, { Toaster } from 'react-hot-toast'

interface NotificationContextType {
  showSuccess: (message: string) => void
  showError: (message: string) => void
  showInfo: (message: string) => void
}

export const NotificationContext = createContext<NotificationContextType | null>(null)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const showSuccess = (message: string) => toast.success(message)
  const showError = (message: string) => toast.error(message)
  const showInfo = (message: string) => toast(message)

  return (
    <NotificationContext.Provider value={{ showSuccess, showError, showInfo }}>
      {children}
      <Toaster position="top-right" />
    </NotificationContext.Provider>
  )
}