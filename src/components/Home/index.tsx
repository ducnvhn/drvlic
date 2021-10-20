import React from 'react'
import {
  Grid,
  CircularProgress 
} from '@material-ui/core'
import {
  useLazyQuery,
  gql
} from '@apollo/client'
import {
  makeStyles
} from '@material-ui/styles'
import { Alert } from '@material-ui/lab'
import {
  User,
  useAuth
} from '../../context/AuthenticationContext'
import MainHome from './HomeComps/MainHome'
import SettingsProvider from '../../context/SettingsContext'

const useStyle = makeStyles({
  blankContainer: {
    width: '100%',
    height: '100vh',
    background: '#fff'
  },
  spinnerContainer: {
    marginTop: '15em'
  }
})

const GET_USER = gql`
  query me {
    me{
      _id
      role
      email
      name
      profile {
        avatar
      }
      expDate
    }
  }
`
// 
function Home() {
  const { setUser } = useAuth()
  const [loadUser, { loading, data, error }] = useLazyQuery(GET_USER)
  React.useEffect(() => {
    const load = async () => {
      await  loadUser()
      if (data) {
        const { me } = data
        setUser(me as User)
      }
    }
    load()
  }, [loadUser, setUser, data])

  const classes = useStyle()
  if (loading || error) {
    return (
      <Grid direction="column" alignItems="center" className={classes.blankContainer} container justifyContent="center">
        <Grid className={classes.spinnerContainer} item xs={12}>
          {loading && <CircularProgress />}
          {error && (
            <Alert variant="filled" severity="error">
              Đã có lỗi xẩy ra, vui lòng thử lại sau
            </Alert>
          )}
        </Grid>
      </Grid>
    )
  }
  if (!loading && !error && data) {
    return (
      <SettingsProvider>
        <MainHome />
      </SettingsProvider>
    )
  }
  return null
}

export default Home

