import React from 'react'
import {
    Table
} from 'antd'
import moment from 'moment'
import {
    Link
} from 'react-router-dom'
import { trangthaibaocao } from '../../../common/trangthai'

type CType = {
    reports: Record<string,any>[]
    type: string
}

const ReportList:React.FC<CType> = ({
    reports,
    type
}) => {
    const columns = [
        {
            title: 'Ngày tạo',
            dataIndex: 'created',
            render: (text: string) => <span>{moment(parseFloat(text)).format('DD/MM/YYYY')}</span>
        },
        {
            title: 'Hạng bằng',
            dataIndex: 'hangbang'
        },
        {
            title: 'Tên báo cáo',
            dataIndex: 'name',
            render: (text: string, record: any) => <Link to={`${ type==='BC1'? '/rp1/':'/rp2/'}${record._id}`}>{text}</Link>
        },
        {
            title: 'Chú thích',
            dataIndex: 'desc'
        },
        {
            title: 'SL học viên',
            dataIndex: 'stdCount',
            render: (text: string) => <strong>{text? text : '0'}</strong>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (text: string) => (
                <span>
                    {trangthaibaocao[text as keyof Object]}
                </span>
            )
        }
    ]
    return (
        <div>
            <Table
                dataSource={reports}
                columns={columns}
                pagination={false}
            />
        </div>
    )
}

export default ReportList
