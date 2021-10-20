import React from 'react'
import {
  Grid,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  CircularProgress
} from '@material-ui/core'
import {
  Alert
} from '@material-ui/lab'
import {
  useForm,
  Controller,
  SubmitHandler
} from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles';
import {
  Visibility,
  VisibilityOff
} from '@material-ui/icons'
import {
  gql,
  useMutation,
  // useQuery
} from '@apollo/client'
import {
  useAuth
} from '../../context/AuthenticationContext'
import {
  useHistory,
} from 'react-router-dom'

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        role
        email
        name
        expDate
      }
      token
      tokenExpiration
    }
  }
`

const useStyles = makeStyles({
  loginPaper: {
    marginTop: '8em',
    padding: '2em',
    background: "#FFF"
  },
  formItem: {
    marginTop: '1em'
  },
  loginBtnContainer: {
    textAlign: 'right',
    marginTop: '2em'
  }
})

interface IFormInput {
  email: string
  password: string
}

const LoginForm = () => {
  const history = useHistory()
  const { setToken } = useAuth()
  const [passwordVisible, togglePasswordVisible] = React.useState(false)
  const { control, handleSubmit } = useForm()
  const classes = useStyles()
  const [login, { loading, error }] = useMutation(LOGIN)
  const onSubmit:SubmitHandler<IFormInput> = async data => {
    const { email, password } = data
    try {

      await login({ variables: { email, password }})
      .then(res => {
        const { data: { login } } = res
        const { token } = login
        setToken(token)
        history.push('/')
      })
    } catch (e) {
      console.log(e)
    }
  }
  const handleClickShowPassword = () => togglePasswordVisible(!passwordVisible)
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={4} lg={3}>
        <Paper className={classes.loginPaper} elevation={1}>
          <Typography align="center" variant="h4">Đăng nhập</Typography>
          {error && <Alert severity="error">Sai email hoặc mật khẩu, vui lòng kiểm tra lại</Alert>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="email"
              render={({ field }) => <TextField placeholder="Số điện thoại hoặc email" defaultValue={``} label="Email / SĐT" variant="outlined" className={classes.formItem} fullWidth {...field} />}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextField
                  placeholder="Mật khẩu"
                  label="Mật khẩu"
                  variant="outlined"
                  className={classes.formItem}
                  fullWidth
                  type={passwordVisible ? 'text' : 'password'}
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleClickShowPassword}
                        >
                          {passwordVisible ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    
                  }}
                  {...field}
                />
              )}
            />
            <div className={`${classes.formItem} ${classes.loginBtnContainer}`}>
              <Button data-testid="login" onClick={handleSubmit(onSubmit)} fullWidth size="large" variant="contained" color="primary">
                {loading ? <CircularProgress data-testid="loadingicon" /> : 'Đăng Nhập'}
              </Button>
            </div>
            <div className={classes.formItem}>
              Chưa có tài khoản? 
              <a href="/register">{` Đăng ký `}</a>
               ngay và dùng thử Miễn phí
            </div>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}
export default LoginForm