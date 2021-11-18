import React from 'react'
import {
    Button,
    message,
    PageHeader,
    Tooltip
} from 'antd'
import { CloseOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import CreateUserModal from './CreateUserModal'
import FilterModal from './FilterModal'

type CType = {
    createUser: (user: Record<string,any>) => void
    setFilter: (filter: Record<string,any>) => void
    filter: Record<string, any>
}

const SettingHeader:React.FC<CType> = ({
    createUser,
    setFilter,
    filter
}) => {
    const [createModal, toggleCreateModal] = React.useState(false)
    const [filterModal, toggleFilterModal] = React.useState(false)
    const createU = async (user: Record<string,any>) => {
        try {
            await createUser({
                variables: {
                    userInput: user
                }
            })
            message.success('Tạo người dùng thành công')
            toggleCreateModal(false)
        } catch (e) {
            message.error('Không thể tạo người dùng mới. Vui lòng kiểm tra lại thông tin')
        }
    }

    const isFilterEmpty = () => {
        return Object.values(filter).every(f => f === null)
    }

    const onFilterClick = () => {
        if (isFilterEmpty()) {
            toggleFilterModal(true)
        } else {
            setFilter({
                name: null,
                email: null,
                role: null
            })
        }
    }
    return (
        <div>
            <PageHeader
                title="Danh sách người dùng"
                extra={[
                    <Tooltip title="Thêm người dùng" key="1">
                        <Button onClick={() => toggleCreateModal(true)} type="primary" shape="round" icon={<PlusOutlined />} />
                    </Tooltip>,
                    <Tooltip title={isFilterEmpty() ? 'Tìm kiếm': 'Bỏ tìm kiếm'} key="2">
                        <Button
                            onClick={() => onFilterClick()}
                            type="text"
                            icon={isFilterEmpty() ? <SearchOutlined /> : <CloseOutlined />}
                        />
                    </Tooltip>
                ]} 
                />
            <CreateUserModal
                createU={createU}
                visible={createModal}
                onCancel={() => toggleCreateModal(false)}
                onOk={() => toggleCreateModal(false)}
            />
            <FilterModal
                visible={filterModal}
                onCancel={() => toggleFilterModal(false)}
                setFilter={setFilter}
            />
        </div>
    )
}

export default SettingHeader