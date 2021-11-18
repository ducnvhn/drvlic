import React from 'react'
import {
  Layout,
  Menu,
  Button,
  Dropdown
} from 'antd'
import {
  LogoutOutlined,
  OrderedListOutlined,
  SettingOutlined,
  SnippetsOutlined,
  SolutionOutlined,
  UsergroupAddOutlined,
  UserOutlined
} from '@ant-design/icons'
import {
  useLazyQuery,
  gql
} from '@apollo/client'
import {
  User,
  useAuth
} from '../../context/AuthenticationContext'
import Main from './Main'
import {
  useHistory,
  Route,
  Switch,
  Link,
  // useLocation
} from 'react-router-dom'
import './home.css'
import {
  LOAD_A_REPORT,
  CREATE_A_REPORT,
  APPROVE_R1,
  MOVE_TO_R1,
  REMOVE_FROM_REPORT,
  LOAD_SINGLE_REPORT,
  MARK_COMPLETED,
  LOAD_B_REPORTS,
  CREATE_BREPORT,
  LOAD_SINGLE_B_REPORT,
  MOVE_TO_R2,
  APPROVE_B_REPORT,
} from '../common/ClientQueries'
import SingleStudent from './SingleStudent'
import ReportOnes from './ReportOnes'
import SingleAttReport from './SingleReportOne'
import Profile from './Profile'
import UserMgt from './UserMgt'
import SingleUser from './SingleUser'

const {
  // Sider,
  Content,
  Header
} = Layout

const GET_USER = gql`
  query me {
    me{
      _id
      role
      email
      name
      shouldChangePwd
      profile {
        avatar
      }
    }
  }
`
// 
function Home() {
  console.log('re-rendering')
  const { setUser } = useAuth()
  const history = useHistory()
  const [loadUser, { loading, data, error }] = useLazyQuery(GET_USER, { onCompleted: (data: any) => {
    const { me } = data
    setUser(me as User)
  }})
  // const [sider, setSider] = React.useState(false);
  const { logout } = useAuth()
  // const location = useLocation()

  React.useEffect(() => {
    const load = async () => {
      await  loadUser()
      if (data) {
        const { me } = data
        setUser(me as User)
      }
    }
    load()
  }, [loadUser, setUser])
  
  const handleLogout = () => {
    logout()
    history.push('/login')
  }
  
  // const onCollapse = (collapse: boolean) => setSider(collapse)

  const menu = (
    <Menu theme="dark">
      <Menu.Item icon={<UserOutlined />}>
        <Link to="/profile">
          Đổi mật khẩu
        </Link>
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />} onClick={() => handleLogout()}>Đăng xuất</Menu.Item>
    </Menu>
  )
  
  if (error) {
    history.push('/login')
  }
  if (loading) {
    return (
      <span>loading...</span>
    )
  }
  if (!loading && !error && data) {
    return (
      <Layout className="homeContainer">
        <Header className="homeHeader">
          <div  style={{ flexGrow: 1 }} >
            <Menu style={{fontSize: '16px'}} theme="dark" mode="horizontal">
              <Menu.Item key="one" icon={<SnippetsOutlined style={{fontSize: '16px'}} />}>
                <Link to="/">
                  Hồ sơ
                </Link>
              </Menu.Item>
              {data.me && (data.me.role === 'ADMIN' || data.me.role === 'MANAGER' || data.me.role === 'SUPER_ADMIN') && (
                <Menu.Item key="two" icon={<OrderedListOutlined style={{ fontSize: '16px' }} />}>
                  <Link to="/rp1">
                    Báo cáo 1
                  </Link>
                </Menu.Item>
              )}
              {data.me && (data.me.role === 'ADMIN' || data.me.role === 'MANAGER' || data.me.role === 'SUPER_ADMIN') && (
                <Menu.Item key="three" icon={<SolutionOutlined style={{ fontSize: '16px' }} />}>
                  <Link to="/rp2">
                    Báo cáo 2
                  </Link>
                </Menu.Item>
              )}
              {data.me && (data.me.role === 'SUPER_ADMIN') && (
                <Menu.SubMenu title="Hệ thống" icon={<SettingOutlined />}>
                  <Menu.Item key="four" icon={<UsergroupAddOutlined />}>
                    <Link to="/users">
                      Người dùng
                    </Link>
                  </Menu.Item>
                </Menu.SubMenu>
              )}
            </Menu>
          </div>
          <Dropdown trigger={['click']} overlay={menu}>
            <Button shape="round" >{data.me.name}</Button>
          </Dropdown>
        </Header>
        <Content className="homeContent">
          <Switch>
            <Route path="/std/:id" exact>
              <SingleStudent />
            </Route>
            <Route path="/rp1" exact>
              <ReportOnes
                type="BC1"
                title="Danh sách báo cáo 1"
                createQuery={{
                  reportKey: 'loadAReport',
                  query:CREATE_A_REPORT
                }}
                loadQuery={{
                  reportKey: 'loadAReport',
                  query: LOAD_A_REPORT
                }}
              />
            </Route>
            <Route path="/rp1/:id" exact>
              <SingleAttReport
                type="BC1"
                dataKey="loadSingleAttReport"
                loadReport={LOAD_SINGLE_REPORT}
                approveReport={APPROVE_R1}
                markComplete={MARK_COMPLETED}
                addStd={MOVE_TO_R1}
                removeStd={REMOVE_FROM_REPORT}
              />
            </Route>
            <Route path="/rp2" exact>
              <ReportOnes
                  type="BC2"
                  title="Danh sách báo cáo 2"
                  createQuery={{
                  reportKey: 'loadAReports',
                  query: CREATE_BREPORT
                }}
                loadQuery={{
                  reportKey: 'loadBreports',
                  query: LOAD_B_REPORTS
                }}/>
            </Route>
            <Route path="/rp2/:id" exact>
              <SingleAttReport
                type="BC2"
                dataKey="loadSingleBReport"
                loadReport={LOAD_SINGLE_B_REPORT}
                approveReport={APPROVE_B_REPORT}
                markComplete={MARK_COMPLETED}
                addStd={MOVE_TO_R2}
                removeStd={REMOVE_FROM_REPORT}
              />
            </Route>
            <Route path="/profile" exact>
              <Profile />
            </Route>
            <Route path="/users" exact>
              <UserMgt />
            </Route>
            <Route path="/users/:id" exact>
              <SingleUser />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </Content>
      </Layout>
    )
  }
  return null
}

export default Home

