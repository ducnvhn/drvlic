import React from 'react'
import {
    Button,
    PageHeader,
    Tooltip,
    Modal,
    message
} from 'antd'
import {
    useParams,
    useHistory
} from 'react-router-dom'
import {
    gql,
    useLazyQuery,
    useMutation
} from '@apollo/client'
import LoadinCenter from '../../common/LoadingCenter'
import UserInfo from './UserInfo'
import { KeyOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons'
import ResetPwdModal from './ResetPwdModal'

const LOAD_USER = gql `
    query loadUser($_id: String!) {
        loadUser(_id: $_id) {
            _id
            disabled
            name
            email
            role
            createdBy
            created
            profile {
                avatar
            }
            shouldChangePwd
        }
    }
`
const LOCK_USER = gql `
    mutation disableUser($_id: String!, $disabled: Boolean) {
        disableUser(_id: $_id, disabled: $disabled) {
             _id
            disabled
            name
            email
            role
            createdBy
            created
            profile {
                avatar
            }
            shouldChangePwd
        }
    }
`
const RESET_PWD = gql `
    mutation setPwd($_id: String!, $password: String!, $confirmPassword: String!) {
        setPwd(_id: $_id, password: $password, confirmPassword: $confirmPassword) {
             _id
            disabled
            name
            email
            role
            createdBy
            created
            profile {
                avatar
            }
            shouldChangePwd
        }
    }
`

const SingleUser = () => {
    const params:any = useParams()
    const { id } = params
    const history = useHistory()
    const [loadUser, { loading, data }] = useLazyQuery(LOAD_USER)
    const [disableUser] = useMutation(LOCK_USER)
    const [resetPwd] = useMutation(RESET_PWD)
    const [confirmModal, toggleConfirmModal] = React.useState(false)
    const [pwdModal, togglePwdModal] = React.useState(false)
    // const [deleteUser] = useMutation(DELETE_USER, { refetchQueries: [LOAD_USER]})
    
    React.useEffect(() => {
        const load = async () => {
            await loadUser({
                variables: {
                    _id: id
                }
            })
        }
        load()
    }, [id, loadUser])

    const confirmLock = async (disabled: boolean, title: string, content: string) => {
        Modal.confirm({
            title,
            content,
            visible: confirmModal,
            onCancel: () => toggleConfirmModal(false),
            onOk: () => {
                disableUser({
                    variables: {
                        _id: data.loadUser._id,
                        disabled
                    }
                })
            }
        })
    }

    const updatePwd = async (password: string, confirmPassword: string) => {
        try {
            await resetPwd({
                variables: {
                    _id: id,
                    password,
                    confirmPassword
                }
            })
            message.success('Đặt lại mật khẩu thành công')
            togglePwdModal(false)
        } catch (error) {
            message.error('Đặt lại mật khẩu không thành công')
        }
    }

    return (
        <div>
            {loading && (
                <LoadinCenter />
            )}
            {data && data.loadUser && (
                <div>
                    <PageHeader
                        onBack={() => history.push('/users')}
                        title="Thông tin người dùng"
                        extra={[
                            <Tooltip title="Khóa tài khoản" id="1">
                                {!data.loadUser.disabled ?
                                    <Button onClick={() => confirmLock(!data.loadUser.disabled, 'Khóa tài khoản', `Bạn có muốn khóa tài khoản người dùng ${data.loadUser.name} `)} danger type="text" icon={<LockOutlined />} />
                                    :
                                    <Button onClick={() => confirmLock(!data.loadUser.disabled, 'Mở khóa tài khoản', `Bạn có muốn mở khóa tài khoản người dùng ${data.loadUser.name} `)} type="text" icon={<UnlockOutlined />} />
                                }
                            </Tooltip>,
                            <Tooltip title="Đặt lại mật khẩu" id="2">
                                <Button onClick={() => togglePwdModal(true)} type="text" icon={<KeyOutlined />} />
                            </Tooltip>
                        ]}
                    />
                    <UserInfo
                        user={data.loadUser}
                    />
                    <ResetPwdModal
                        visible={pwdModal}
                        onCancel={() => togglePwdModal(false)}
                        onOk={updatePwd}
                    />
                </div>
            )}
        </div>
    )
}
export default SingleUser