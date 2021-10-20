import React from 'react'
import {
  gql,
  useLazyQuery
} from '@apollo/client'

const LOAD_SETTINGS = gql`
  query loadSettings {
    loadSettings {
      units
      categories
      productsPerPage
      owner
      created
      changed
    }
  }
`

type TSettings = {
  units: string[]
  categories: string[]
  productsPerPage: number
}
interface ISettings {
  getSettings: () => TSettings | {
    units: [],
    categories: [],
    productsPerPage: 100
  }
}

const settingContext = React.createContext<ISettings>({} as ISettings)

const SettingsProvider:React.FC = ({children}) => {
  const [loadSettings, { data}] = useLazyQuery(LOAD_SETTINGS)
  React.useEffect(() => {
    const load = async () => loadSettings()
    load()
  }, [loadSettings])

  const getSettings = () => data?.loadSettings || {
    units: [],
    categories: [],
    productsPerPage:100
  }
  return (
    <settingContext.Provider value={{ getSettings }}>
      {children}
    </settingContext.Provider>
  )
}
export default SettingsProvider
export const useSettings = () => React.useContext(settingContext)
