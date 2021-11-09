import React from 'react'
import moment from 'moment'
import {
    Table,
    Pagination,
    Space
} from 'antd'
import {
    Link
} from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons';
import './style.css'
import status from '../../../../common/StudentStatus'
import {
    useAuth
} from '../../../../../context/AuthenticationContext'

interface cType {
    students: {
        students:any[]
        total: number
    }
    loading: boolean
    currentPage: number
    pageSize: number
    setCurrentPage: (page: number) => void
    rowSelection: {
        onChange: (keys: any) => void
        selectedRowKeys: string[]
    }
}

const StudentList:React.FC<cType> = ({
    students,
    loading,
    currentPage,
    setCurrentPage,
    pageSize,
    rowSelection
}) => {
    // const [selected, setSelected] = React.useState<string[]>([])
    const { getUser } = useAuth()
    const user = getUser()
    const columns = [
        {
            title: 'Mã hồ sơ',
            dataIndex: 'randomId',
            render: (text:string, record: any) => {
                return <span style={{ textDecoration: record.trangthai === 'DA_RUT_HS' ? 'line-through': 'none'}}>{text}</span>
            }
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created',
            render: (text: string) => <span>{moment(parseFloat(text)).format('DD/MM/YYYY')}</span>
        },
        {
            title: 'Tên',
            dataIndex: ['ten'],
            render: (text: string, record: any) =><Link to={`/std/${record.randomId}`}>{text}</Link>
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'ngaysinh',
            render: (text: string) => {
                return (<span>{moment(parseFloat(text)).format('DD/MM/YYYY')}</span>)
            }
        },
        {
            title: 'Số Điện thoại',
            dataIndex: 'mobile'
        },
        {
            title: 'Hạng bằng lái',
            dataIndex: 'hangbang'
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'trangthai',
            render: (text: string) => {
                
                return <span>{status[text as keyof Object]}</span>
            }
        },
        {
            title: 'Báo cáo',
            render: (_: string, record: any) => {
                if (record.baocao1) {
                    if (user.role === 'TEACHER') {
                        return <span>{record.baocao1.name}</span>
                    }
                    if (user.role === 'MANAGER' || user.role === 'ADMIN') {
                        return (<Link to={`/rp1/${record.baocao1._id}`}>{record.baocao1.name}</Link>)
                    }
                }
                return (<span>NA</span>)
            }
        }
    ]
    // const rowSelection = {
    //     onChange: (keys: any) => setSelected(keys),
    //     selectedRowKeys: selected
    // }
    return (
        <div style={{display: 'flex'}}>
            <Space direction="vertical" size="large" style={{flexGrow: 1}}>
                <Table
                    rowKey="_id"
                    loading={{
                        spinning: loading,
                        indicator: <LoadingOutlined style={{fontSize: 24}} />
                    }}
                    columns={columns}
                    dataSource={students.students}
                    pagination={false}
                    rowClassName={(record:any) => {
                        if (record.trangthai === 'DA_RUT_HS') {
                            return 'disabledStudent'
                        }
                        return ''
                    }}
                    rowSelection={rowSelection}
                />
                {students.total > pageSize && (
                    <Pagination
                        onChange={(page) => setCurrentPage(page)}
                        showSizeChanger={false}
                        current={currentPage}
                        total={students.total}
                        pageSize={pageSize}
                        size="small"
                        showQuickJumper={false}
                    />
                )}
            </Space>
        </div>
    )
}
export default StudentList