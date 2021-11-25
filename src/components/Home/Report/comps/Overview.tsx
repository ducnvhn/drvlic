import React from 'react'
import {
    Descriptions,
    Alert
} from 'antd'
import moment from 'moment'
import {
    numberWithCommas
} from '../../../../Utils/math'

type OType = {
    range: {
        start: any,
        end: any
    },
    totalAmount: number
    totalRecords: number
}
const Overview:React.FC<OType>  = ({
    range,
    totalAmount,
    totalRecords
}) => {
    return (
        <Alert
            closable
            type="info"
            message={(
                <Descriptions title="Tổng thể" column={4}>
                    <Descriptions.Item label="Từ">{moment(range.start).format('DD/MM/YYYY')}</Descriptions.Item>
                    <Descriptions.Item label="Đến">{moment(range.end).format('DD/MM/YYYY')}</Descriptions.Item>
                    <Descriptions.Item label="Số lần thu/chi">{totalRecords}</Descriptions.Item>
                    <Descriptions.Item label="Số Tiền">{`${numberWithCommas(totalAmount)} VNĐ`}</Descriptions.Item>
                </Descriptions>
            )}
        />
    )
}

export default Overview