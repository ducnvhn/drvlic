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
import {
    LoadingOutlined,
    CheckCircleTwoTone 
} from '@ant-design/icons';
import './style.css'
import status from '../../../../common/StudentStatus'
import {
    useAuth
} from '../../../../../context/AuthenticationContext'
import { ColumnGroupType, ColumnType } from 'antd/lib/table';

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
    },
    sort: Record<string,any>
    setSort: (sort: Record<string, any>) => void
}

const StudentList:React.FC<cType> = ({
    students,
    loading,
    currentPage,
    setCurrentPage,
    pageSize,
    rowSelection,
    sort,
    setSort
}) => {
    // const [selected, setSelected] = React.useState<string[]>([])
    const { getUser } = useAuth()
    const user = getUser()
    const columns:any = [
        {
            title: 'Mã hồ sơ',
            dataIndex: 'randomId',
            render: (text:string, record: any) => {
                return (
                    <Space style={{ textDecoration: record.trangthai === 'DA_RUT_HS' ? 'line-through': 'none'}}>
                        {record.trangthai === 'HOAN_THANH' && <CheckCircleTwoTone twoToneColor="#52c41a" /> }
                        {text}
                    </Space>
                )
            }
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created',
            sorter: true, 
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
            title: 'Báo cáo 1',
            render: (_: string, record: any) => {
                if (record.baocao1) {
                    if (user.role === 'TEACHER') {
                        return <span>{record.baocao1.name}</span>
                    } else {
                        return (<Link to={`/rp1/${record.baocao1._id}`}>{record.baocao1.name}</Link>)

                    }
                }
                return (<span>----</span>)
            }
        },
        {
            title: 'Báo cáo 2',
            render: (_: string, record: any) => {
                if (record.baocao2) {
                    if (user.role === 'TEACHER') {
                        return <span>{record.baocao1.name}</span>
                    }
                    if (user.role === 'MANAGER' || user.role === 'ADMIN') {
                        return (<Link to={`/rp1/${record.baocao2._id}`}>{record.baocao2.name}</Link>)
                    }
                }
                return (<span>----</span>)
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
                    onChange={(pagination, filters, sorter:any, extra) => {
                        if (sorter) {
                            let s:Record<string,any> = {}
                            s[sorter.field as keyof Object] = sorter.order === 'descend' ? 1 : -1
                            setSort(s)
                        }
                    }}
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
                        if (record.trangthai === 'DA_BO_HOC') {
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