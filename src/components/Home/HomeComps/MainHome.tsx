import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
import {
  useAuth
} from '../../../context/AuthenticationContext'
import {
  useHistory
} from 'react-router-dom'
import AppToolbar from './AppToolbar';
import AppDrawer from './Drawer'
import {
  Switch,
  Route
} from 'react-router-dom'
import Settings from '../Settings';
import Products from '../Products'
import Stock from '../Stock'
// import {
//   // TitleProvider,
//   useTitle
// } from '../../../context/TitleContext'

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  toolbarTitle: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    background: '#fff',
    minHeight: '100vh'
  },
  menuLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  menuLinkActive: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
    '&:hover' : {
      // color: 'inherit'
      backgroundColor: theme.palette.secondary.dark
    }
  }
}));

export const links = [
  {
    to: '/home',
    text: 'Trang chủ',
    
  },
  {
    to: '/shops',
    text: 'Cửa hàng'
  },
  {
    to: '/products',
    text: 'Sản phẩm'
  },
  {
    to: '/stock',
    text: 'Kho hàng'
  }
]
export default function MiniDrawer() {
  const classes = useStyles();
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { logout } = useAuth()
  const history = useHistory()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout()
    history.push('/login')
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppToolbar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        logout={handleLogout}
      />
      <AppDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/settings" exact component={Settings} />
          <Route path="/products" exact component={Products} />
          <Route path="/stock" component={Stock} />
          <Route path="/" render={() => <div>home</div>} />
        </Switch>
      </main>
    </div>
  );
}
