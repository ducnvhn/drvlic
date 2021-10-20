import React from 'react'
import {
  Drawer,
  Divider,
  List,
  ListItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core"
import clsx from 'clsx'
import {
  useStyles,
  // links
} from './MainHome'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useTheme } from '@material-ui/core/styles'
import {
  CustomIcon
} from '../../../icons/customIcons'
import {
  useLocation,
  Link
} from 'react-router-dom'
import {
  Cart,
  SellBox,
  Stock
} from '../../../Utils/Reuseable/Icons'

interface IProps {
  open: boolean
  handleDrawerClose: () => void
}

const links = [
  {
    name: 'home',
    to: '/',
    text: 'Trang chủ',
    icon: () => <CustomIcon src="home.svg" />
  },
  {
    to: '/shops',
    text: 'Cửa hàng',
    icon: () => <CustomIcon src="/medshop.svg" />,
    name: 'shops',
  },
  {
    name: 'agents',
    to: '/agent',
    text: 'Nhân Viên',
    icon: () => <CustomIcon src="/agent.svg" />
  },
  {
    name: 'products',
    to: '/products',
    text: 'Sản phẩm',
    icon: () => <CustomIcon src="/medicalkit.svg" />
  },
  {
    name: 'stock',
    // to: '/stock',
    text: 'Kho hàng',
    icon: () => <CustomIcon src="/storage.svg" />,
    subs: [
      {
        to: '/stock',
        text: 'Tồn kho',
        icon: <Stock />,
      },
      {
        to: '/stock/purchases',
        text: 'Nhập hàng',
        icon: <Cart />
      },
      {
        to: '/stock/transfer',
        text: 'Xuất kho',
        icon: <SellBox />
      },
      {
        to: '/stock/asset',
        text: 'Kiểm kê',
        icon: () => null
      },
    ]
  },
  {
    name: 'settings',
    to: '/settings',
    text: 'Thiết lập',
    icon: () => <CustomIcon src="/settings.svg" />
  }
]

const defaultExpandable: Record<string,boolean> = {
  stock: false,
  agents: false,
  products: false,
  shops: false
}

const AppDrawer: React.FC<IProps> = ({
  open,
  handleDrawerClose
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const { pathname } = useLocation()
  const [expandable, setExpandable] = React.useState(defaultExpandable)

  const handleExpand = (key: string) => {
    const oldValue = expandable[key]
    const newExpandable = { ...expandable }
    newExpandable[key] = !oldValue
    setExpandable(newExpandable)
  }

  return (
    <Drawer
      data-testid="appdrw"
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {links.map((item, index) => {
            if (!item.to && item.subs) {
              return (
                <div>
                  <ListItem button onClick={() => handleExpand(item.name)}>
                    <ListItemIcon>{item.icon()}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                    <Collapse in={expandable[item.name]} unmountOnExit style={{paddingLeft: '1em'}}>
                      <List component="div" disablePadding>
                        {item.subs.map(sub => (
                          <Link key={sub.to} to={sub.to} className={classes.menuLink}>
                            <ListItem button className={classes.menuLink}>
                              <ListItemIcon>{sub.icon}</ListItemIcon>
                                <ListItemText>{sub.text}</ListItemText>
                            </ListItem>
                          </Link>
                        ))}
                      </List>
                    </Collapse>
                </div>
              )
            } else {
              return  (
                <Link key={item.to} to={item.to} className={classes.menuLink}>
                  <ListItem button className={`${classes.menuLink} ${pathname === item.to ? classes.menuLinkActive : null}`}>
                    <ListItemIcon>
                      {item.icon()}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </Link>
              )
            }
          })}
        </List>
      </Drawer>
  )
}
export default AppDrawer