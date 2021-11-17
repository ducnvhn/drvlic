import React from 'react'

interface ITitleContext {
  setCurrentTitle: (title: string) => void
  getTitle: () => string
}

const titleContext = React.createContext<ITitleContext>({} as ITitleContext)

const TitleProvider: React.FC = ({ children }) => {
  const [title, setTitle] = React.useState('Trang chủ')
  const setCurrentTitle = (title: string) => setTitle(title)
  const getTitle = () => title
  return (
    <titleContext.Provider value={{ setCurrentTitle, getTitle }}>
      {children}
    </titleContext.Provider>
  )
}
export default TitleProvider
export const useTitle = () => React.useContext(titleContext)