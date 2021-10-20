import React from 'react'
import {
  useStyles
} from './MainHome'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import clsx from 'clsx'
import {
  useAuth
} from '../../../context/AuthenticationContext'
import {
  useLocation
} from 'react-router-dom'

interface IProps {
  open: boolean
  handleDrawerOpen: () => void
  logout: () => void
}


// type PMap = Map<string, string>
const paths = new Map<string,string> ()
paths.set('/home', 'Trang chủ')
paths.set('/', 'Trang chủ')
paths.set('/settings', 'Thiết lập')
paths.set('/shops', 'Cửa hàng')
paths.set('/agent', 'Nhân viên')
paths.set('/stock', 'Kho hàng')
paths.set('/products', 'Sản phẩm')
const AppToolbar:React.FC<IProps> = ({
  open,
  handleDrawerOpen,
  logout
}) => {
  const { getUser } = useAuth()
  const currentUser = getUser();
  const classes = useStyles()
  const {
    pathname
  } = useLocation()
  // console.log(pathname)
  return (
    <AppBar
        elevation={0}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon data-testid="menuicon" />
          </IconButton>
          <Typography className={classes.toolbarTitle} variant="h6" noWrap>
            {paths.get(pathname)}
          </Typography>
          <Typography>
            {currentUser.name}
          </Typography>
          <IconButton style={{color:'white'}} onClick={() => logout()}>
            <AccountCircleIcon data-testid="accounticon" />
          </IconButton>
        </Toolbar>
      </AppBar>
  )
}
export default AppToolbar