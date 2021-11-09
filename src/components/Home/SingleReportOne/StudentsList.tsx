import React from 'react'
import {
    Menu,
    Button,
    Dropdown,
    Modal,
    PageHeader,
    Table,
    message
} from 'antd'
import moment from 'moment'
import { CheckOutlined, EllipsisOutlined, FilterOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'

import AddStdModal from './AddStdModal'
import FilterModal from './FilterModal'
// import { MARK_COMPLETED } from '../../common/ClientQueries'

type CType = {
    students: Record<string,any>[]
    removeStudents: (students: string[]) => void
    setFilter: (filter: Record<string,any>) => void
    filter: Record<string, any>
    report: Record<string,any>
    addStudents: (students: string[]) => void
    markComp: (students: string[]) => void
    type: string
}

const StudentsList:React.FC<CType> = ({
    students,
    removeStudents,
    setFilter,
    filter,
    report,
    addStudents,
    markComp,
    type
}) => {
    const [selected, setSelected] = React.useState<string[]>([])
    // const [working, setWorking] = React.useState<string>('')
    const [filterModal, toggleFilterModal] = React.useState(false)
    const [removeModal, toggleRemoveModal] = React.useState(false)
    const [addModal, toggleAddModal] = React.useState(false)
    const columns = [
        {
            title: 'STT',
            render: (_: any, __: any, index: number) => <span>{index + 1}</span>
        },
        {
            title: 'Mã hồ sơ',
            dataIndex: 'randomId'
        },
        {
            title: 'Tên',
            dataIndex: 'ten'
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'ngaysinh',
            render: (t: string) => <span>{moment(parseFloat(t)).format('DD/MM/YYYY')}</span>
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'mobile'
        }
    ]
    const rowSelection = {
        onChange: (keys: any) => {
            setSelected(keys)
            console.log(`the keys of the row is ${keys}`)
        },
        selectedRowKeys: selected
        
    }

    const notFilterEmpty = () => {
        const matchingKey = Object.keys(filter).find(k => filter[k] !== null)
        return Boolean(matchingKey)
    }
    const remove = async () => {
        Modal.confirm({
            title: 'Loại hồ sơ khỏi báo cáo?',
            content: 'Bạn sẽ không phải thêm lại thông tin cho những hồ sơ này',
            onCancel: () => toggleRemoveModal(false),
            visible: removeModal,
            onOk: async () => {
                // setWorking('removing')
                await removeStudents(selected)
                setSelected([])
                // setWorking('')
                toggleRemoveModal(false)
            }
        })
    }

    const onFilterClick = () => {
        if (notFilterEmpty()) {
            setFilter({
                ten: null,
                mobile: null,
                hangbang: null,
                randomId: null,
                trangthai: null
            })
        } else {
            toggleFilterModal(true)
        }
    }
    const onCompleted = async() => {
        if (!selected || selected.length === 0) {
            message.error('Chọn hồ sơ trước khi thực hiện thao tác')
            return
        }
        await markComp(selected)
    }

    const FunctionsDrop = () => (
        <Dropdown key="_men" trigger={['click']} overlay={(
            <Menu theme="dark">
                <Menu.Item onClick={() => toggleAddModal(true)} key="_ađd" icon={<PlusOutlined />}>Thêm hồ sơ</Menu.Item>
                <Menu.Item disabled={selected.length === 0} onClick={() => remove()} key="_rm" icon={<MinusOutlined />}>Loại hồ sơ</Menu.Item>
                <Menu.Item icon={<CheckOutlined />} onClick={() => onCompleted()}>Đánh dấu hoàn thành học</Menu.Item>
            </Menu>
        )}>
            <Button shape="round" type="primary" icon={<EllipsisOutlined />} />
        </Dropdown>
    )
    return (
        <div>
            <PageHeader
                title="Danh sách hồ sơ"
                extra={[
                    <Button danger={notFilterEmpty()} shape="round" key="_filter" icon={<FilterOutlined />} onClick={() => onFilterClick()}>
                        {notFilterEmpty() ? 'Bỏ lọc' : 'Lọc'}
                    </Button>,
                    FunctionsDrop(),
                ]}
            />
            <Table
                rowKey="_id"
                rowSelection={rowSelection}
                dataSource={students}
                columns={columns}
                pagination={false}
            />
            <FilterModal
                // setFilter={setFilter}
                visible={filterModal}
                onCancel={() => toggleFilterModal(false)}
                onOk={(filter: Record<string, any>) => setFilter(filter)}
            />
            <AddStdModal
                type={type}
                hangbang={report.hangbang}
                visible={addModal}
                onCancel={() => toggleAddModal(false)}
                onOk={(stds: string[]) => addStudents(stds)}
            />
        </div>
    )
}

export default StudentsList