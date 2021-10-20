import React from 'react'
import {
  Grid,
  // Paper,
  // Typography,
  CircularProgress,
  Snackbar,
} from '@material-ui/core'
import {
  Alert
} from '@material-ui/lab'
import {
  makeStyles
} from '@material-ui/styles'
import {
  gql,
  useQuery,
  useMutation
} from '@apollo/client'
import UnitSettings from './Units'
// import CategoriesSettings from './Categories'
import DisplaySettings from './Display'

export const LOAD_SETTINGS = gql`
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
const UPDATE_SETTINGS = gql`
  mutation updateSettings($settings: SettingsInput) {
    updateSettings (settings: $settings) {
      units
      categories
      productsPerPage
    }
  }
`
const useStyle = makeStyles({
  settingRoot: {
    flexGrow: 1
  },
  paper: {
    padding: '2em'
  }
})

interface SettingProps {
  units: string[]
  categories: string[]
  productsPerPage: number,
  __typename: string
}
 interface SettingData {
   loadSettings: SettingProps
 }
const Settings = () => {
  const classes = useStyle()
  const {loading, data, error} = useQuery(LOAD_SETTINGS)
  const [updateKey, setUpdateKey] = React.useState('')
  const [update, { loading: updating }] = useMutation(UPDATE_SETTINGS)
  const [updateError, setUpdateError] = React.useState('')

  const closeAlert = () => setUpdateError('')
  const updateSettings = async (key: string, value: string[] | string | number) => {
    setUpdateKey(key)
    const settings = {
      ...data.loadSettings
    }
    
    settings[key] = value
    try {
      await update({
        variables:{
          settings: {
            units: settings.units,
            categories: settings.categories,
            productsPerPage: settings.productsPerPage
          }
        },
        update: (cache, { data }) => {
          const oldData: SettingData = cache.readQuery({ query: LOAD_SETTINGS })!
          cache.writeQuery({
            query: LOAD_SETTINGS,
            data: {
              ...oldData,
              loadSettings: {
                ...oldData?.loadSettings!,
                ...data.updateSettings
              }
            }
          })
        }
      })
    } catch (e) {
      console.log(e)
      setUpdateError('Đã có lỗi xẩy ra trong quá trình cập nhật')
    }
  }

  if (error) {
    setUpdateError('Không thể tải dữ liệu')
  }
  return (
    <div className={classes.settingRoot}>
        {loading && (
          <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
            <CircularProgress />
          </Grid>
        )}
      {!loading && !error && data && (
        <Grid container spacing={2} direction="row" alignItems="flex-start" justifyContent="center">
          <Grid item xs={12} md={4}>
              <UnitSettings
                label="Thêm đơn vị mới"
                title="Đơn vị"
                updating={updating}
                updateKey={updateKey}
                updateSettings={updateSettings}
                data={data.loadSettings.units}
                compKey="units"
              />
          </Grid>
          <Grid item xs={12} md={4}>
            <UnitSettings
                label="Thêm danh mục mới"
                title="Danh mục"
                updating={updating}
                updateKey={updateKey}
                updateSettings={updateSettings}
                data={data.loadSettings.categories}
                compKey="categories"
              />
          </Grid>
          <Grid item xs={12} md={4}>
            <DisplaySettings
              updating={updating}
              updateKey={updateKey}
              updateSettings={updateSettings}
              productsPerPage={data.loadSettings.productsPerPage}
            />
          </Grid>
          <Snackbar open={updateError.length > 0} onClose={closeAlert}>
            <Alert elevation={2} severity="error" onClose={closeAlert}>
              {updateError}
            </Alert>
          </Snackbar>
        </Grid>
      )}
    </div>
  )
}
export default Settings