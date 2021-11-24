import React from 'react'
import {
    Table
} from 'antd'
import moment from 'moment'
import {
    numberWithCommas
} from '../../../../Utils/math'
import { Link } from 'react-router-dom'

const reasons: Record<string,any> = {
    'TT1': 'Thanh toán tiền đợt 1',
    'TT2': 'Thanh toán tiền đợt 2',
    'TLLT': 'Thanh toán tiền thi lại Lý thuyết',
    'TLSH': 'Thanh toán tiền thi lại Sa hình',
    'TLDT': "Thanh toán tiền thi lại Đường trường",
    'OTHER': 'Thanh toán tiền khác',
    'REFUND': "Hoàn tiền - rút hồ sơ"
}

type RLType = {
    records: {
        totalRecords: number
        totalAmount: number
        records: Record<string,any>[]
    }
    filter: Record<string,any>
    setFilter: (filter: Record<string,any>) => void
}

const RecordsList:React.FC<RLType> = ({
    records,
    filter,
    setFilter
}) => {
    const columns = [
        {
            title: 'Mã hồ sơ',
            dataIndex: ['student','randomId'],
        },
        {
            title: 'Tên học viên',
            dataIndex: ['student','ten'],
            render: (text: string, record: any) => {
                return (
                    <Link to={`/std/${record.student.randomId}`}>{text}</Link>
                )
            }
        },
        {
            title: 'Số điện thoại',
            dataIndex: ['student', 'mobile']
        },
        {
            title: 'Ngày',
            dataIndex: 'createdAt',
            render: (text: string) => <span>{moment(parseFloat(text)).format('DD/MM/YYYY')}</span>
        },
        {
            title: 'Tiền',
            dataIndex: 'amount',
            render: (text: string) => <strong style={{ color: parseFloat(text) < 0 ? 'red': 'inherit'}}>{numberWithCommas(text)}</strong>
        },
        {
            title: 'Lý do',
            dataIndex: 'reason',
            render: (text: string) => <span>{reasons[text]}</span>
        }
    ]
    return (
        <div>
            <Table
                columns={columns}
                dataSource={records.records}
                pagination={{
                    pageSize:100,
                    total: records.totalRecords,
                    onChange: (page: number) => {
                        setFilter({
                            ...filter,
                            page
                        })
                    }
                }}
            />
        </div>
    )
}

export default RecordsList