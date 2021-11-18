import React from 'react'
import {
    Button,
    message,
    Modal,
    Space,
    Table
} from 'antd'
import { DeleteOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

type Ctype = {
    users: Record<string,any>[]
    deleteUser: (params: any) => void
}
const roles:Record<string,string> = {
    'TEACHER': 'Giáo Viên',
    'ADMIN': 'NV P.Đào Tạo',
    'FINANCE': 'Kế toán',
    'MANAGER': 'Quản lý',
    'SUPER_ADMIN': 'Quản trị viên',
}
const UsersList:React.FC<Ctype> = ({
    users,
    deleteUser
}) => {
    const [confirmModal, toggleConfirmModal] = React.useState(false)
    const [deleting, toggleDeleting] = React.useState(false)
    const confirmDelete = async (name: string,_id: string) => {
        Modal.confirm({
            title:'Xóa tài khoản người dùng',
            content: `Bạn có muốn khóa tài khoản $Ơname`,
            visible: confirmModal,
            onCancel: () => toggleConfirmModal(false),
            onOk: async () => {
                try {
                    toggleDeleting(true)
                    await deleteUser({
                        variables: {
                            _id
                        }
                    })
                    message.success("Tài khoản đã được xóa")
                    toggleDeleting(false)
                } catch (error) {
                    message.error('Không thể xóa được tài khoản')
                }
            },
            okButtonProps: {
                danger: true,
                loading: deleting
            }
        })
    }
    const columns = [
        {
            title: "Tên",
            dataIndex: 'name',
            render: (text: string, record: any) => {
                return (
                    <Space>
                        {record.disabled && <LockOutlined style={{ color: 'red'}} />}
                        <Link to={`/users/${record._id}`}>
                            {text}
                        </Link>
                    </Space>
                )
            }
        },
        {
            title: 'Email/phone',
            dataIndex: 'email'
        },
        {
            title: 'Vai trò / quyền',
            dataIndex: 'role',
            render: (text: string) => <span>{roles[text]}</span>
        },
        {
            title: 'Xóa',
            render: (_text: string, record: any) => <Button onClick={() => confirmDelete(record.name, record._id)} icon={<DeleteOutlined />} danger type="text" />
        }
    ]
    return (
        <Table
            dataSource={users}
            columns ={columns}
        />
    )
}

export default UsersList