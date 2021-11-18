import React from 'react'
import {
    Descriptions
} from 'antd'
import moment from 'moment'

const roles: Record<string, string> = {
    'TEACHER': 'Giáo Viên',
    'ADMIN': 'NV P.Đào Tạo',
    'FINANCE': 'Kế toán',
    'MANAGER': 'Quản lý',
    'SUPER_ADMIN': 'Quản trị viên',
}

type CType = {
    user: any
}
const BasicInfor: React.FC<CType> = ({
    user
}) => {
    return (
        <Descriptions title="Thông tin người dùng">
            <Descriptions.Item label="Tên">
                <strong>{user.name}</strong>
            </Descriptions.Item>
            <Descriptions.Item label="Tên đăng nhập/ email/ SDT">
                <strong>{user.email}</strong>
            </Descriptions.Item>
            <Descriptions.Item label="Vai trò">
                <strong>{roles[user.role]}</strong>
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
                <strong>{user.disabled ? 'Đã khóa' : 'Đang hoạt động'}</strong>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
                <strong>{moment(parseFloat(user.created)).format('DD/MM/YYYY')}</strong>
            </Descriptions.Item>
        </Descriptions>
    )
}
export default BasicInfor 