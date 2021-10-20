import React from 'react'
import {
  makeStyles
} from '@material-ui/styles'
import {
  Grid,
  TextField,
  Paper,
  Typography,
  InputAdornment,
  IconButton,
  Button,
  FormGroup,
  Checkbox,
  FormControlLabel,
  CircularProgress
} from '@material-ui/core'
import {
  Visibility,
  VisibilityOff,
} from '@material-ui/icons'
// import CircularProgress from '@material-ui/icons/'
import {
  useForm,
  Controller,
  SubmitHandler
} from 'react-hook-form'
import {
  gql,
  useMutation
} from '@apollo/client'

export const REGISTER = gql`
  mutation signup($name: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    signup(name: $name, email: $email, password: $password, confirmPassword: $confirmPassword) {
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
const useStyle = makeStyles({
  regContainer: {
    flexGrow: 1
  },
  formContainer: {
    marginTop: '8em',
    padding: '1em'
  },
  formItem: {
    marginTop: '1em'
  }
})

interface IFormInput {
  email: string
  password: string
  name: string
  confirmPassword: string
  agreement: boolean
}

const RegisterForm = () => {
  const classes = useStyle()
  const { control, handleSubmit, formState: { errors }, watch } = useForm<IFormInput>()
  const [passwordVisible, togglePasswordVisible] = React.useState(false)
  const [registerAccount, { loading }] = useMutation(REGISTER)
   
  const handleClickShowPassword = () => togglePasswordVisible(!passwordVisible)

  const onSubmit:SubmitHandler<IFormInput> = async data => {
    console.log('register btn clicked')
    const { name, email, password, confirmPassword } = data
    if (!name || !email || !password) {
      // show warining here
      return
    }
    if (password !== confirmPassword) {
      // show warning
      return
    }
    if (Object.keys(errors).length > 0) {
      return
    }
    // post data
    await registerAccount({ variables: {
      name,
      email,
      password,
      confirmPassword
    }})
  } 
  // if (errors) {
  //   console.log(errors)
  // }
  return (
    <Grid data-testid="rcontainer" className={classes.regContainer} container alignItems="center" justifyContent="center">
      <Grid xs={12} md={6} lg={4} item>
        <Paper className={classes.formContainer}>
          <Typography style={{ textAlign: 'center' }} variant="h4">Đăng Ký tài khoản</Typography>
          <form onSubmit={handleSubmit(onSubmit)} data-testid="rform">
            <Controller
              rules={{ required: true, minLength: 6 }}
              control={control}
              name="name"
              render={({field}) => (
                <TextField
                  error={'name' in errors}
                  placeholder="Họ và tên người sử dụng"
                  label="Họ và Tên"
                  variant="outlined"
                  className={classes.formItem}
                  fullWidth
                  {...field}
                  helperText={'name' in errors ? '(*) Bắt buộc - Tối thiểu 6 ký tự' : 'Tên có thể viết tiếng Việt có dấu '}
                />
              )}
            />
            <Controller
              control={control}
              rules={{ required: true, minLength: 6 }}
              name="email"
              render={({field}) => (
                <TextField
                error={'email' in errors}
                placeholder="Số điện thoại hoặc email"
                label="Email / SĐT"
                variant="outlined"
                className={classes.formItem}
                fullWidth
                  {...field}
                  helperText={'email' in errors ? '(*) Bắt buộc - phải là email hoặc số điện thoại': 'Nhập email hoặc số điện thoại đề hợp lệ'}
                  />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: true, minLength: 8 }}
              render={({ field }) => (
                <TextField
                error={'password' in errors}
                placeholder="Mật khẩu"
                label="Mật khẩu"
                variant="outlined"
                className={classes.formItem}
                fullWidth
                helperText={'password' in errors ? '(*) Bắt buộc - tối thiểu 8 ký tự' : 'Nhập mật khẩu - tối thiểu 8 ký tự'}
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
            <Controller 
              control={control}
              rules={{ required: true, minLength: 8 }}
              name="confirmPassword"
              render={({ field }) => (
                <TextField
                  placeholder="Nhập lại Mật khẩu"
                  error={'confirmPassword' in errors}
                  label="Nhập lại Mật khẩu"
                  variant="outlined"
                  helperText={'confirmPassword' in errors ? '(*) Bắt buộc - tối thiểu 8 ký tự, trùng khớp bên trên' : 'Nhập mật khẩu - tối thiểu 8 ký tự'}
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
            <br />
            <Controller
              control={control}
              name="agreement"
              render={({ field }) => (
                  <FormGroup row>
                    <FormControlLabel
                      control={<Checkbox {...field} />}
                      label="Tôi đồng ý với các điều khoản sử dụng của e-pharma"
                    />
                  </FormGroup>
                )
              }
            />
            <Button
              data-testid="rbutton"
              className={classes.formItem} variant="contained"
              fullWidth
              color="primary"
              size="large"
              disableElevation
              onClick={handleSubmit(onSubmit)}
              disabled={!watch('agreement') || Object.keys(errors).length > 0}
            >
              {loading ? <CircularProgress data-testid="loadingicon" /> : 'Đăng ký'}
            </Button>
          </form>
          <Typography>
            {`Nếu đã có tài khoản, vui lòng đăng nhập`}
            <a href="/login">{`TẠI ĐÂY`}</a>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default RegisterForm