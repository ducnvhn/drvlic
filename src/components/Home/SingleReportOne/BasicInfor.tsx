import React from 'react'
import {
    Descriptions,
    Alert
} from 'antd'
import moment from 'moment'

const status = {
    'PENDING': 'Đang chờ duyệt',
    'APPROVED': 'Đã được duyệt'
}

type CType = {
    report: Record<string,any>
}

const BasicInfo:React.FC<CType> = ({
    report
}) => {
    return (
        <Alert
            message="Thông tin báo cáo"
            type="info"
            closable
            description={(
                <Descriptions layout="vertical">
                    <Descriptions.Item label="Tên báo cáo">
                        <strong>
                            {report.name}
                        </strong>
                    </Descriptions.Item>
                    <Descriptions.Item label="Ghi chú">
                        {report.desc}
                    </Descriptions.Item>
                    <Descriptions.Item label="Người tạo">
                        {report.createdBy.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">
                        {moment(parseFloat(report.created)).format('DD/MM/YYYY')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                        {status[report.status as keyof Object]}
                    </Descriptions.Item>
                </Descriptions>
            )}
        />
    )
}

export default BasicInfo