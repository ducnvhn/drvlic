import React from 'react'
import {
    Typography,
    Divider,
    Descriptions,
    // Button,
    Image
} from 'antd'
import moment from 'moment'
import status from '../../../common/StudentStatus'

const { Title } = Typography

type BasicInfoType = {
    student: any,
    role: string
}


const BasicInfo:React.FC<BasicInfoType> = ({
    student,
    role,
}) => {
    return (
        <div>
            <Divider />
            <Descriptions
                layout="vertical"
                title={<Title level={4}>Thông tin cơ bản</Title>}
            >
                <Descriptions.Item label="Họ và tên">
                    <strong>
                        {student.ten}
                    </strong>
                </Descriptions.Item>
                <Descriptions.Item label="Ngày tháng năm sinh">{moment(parseFloat(student.ngaysinh)).format('DD/MM/YYYY')}</Descriptions.Item>
                <Descriptions.Item label="Quê quán">{student.quequan}</Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">{student.mobile}</Descriptions.Item>
                <Descriptions.Item label="CMND">
                    <Image src={`http://localhost:5001/${student.anh34}`} />
                </Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions
                layout="vertical"
                title={<Title level={4}>Thông tin đào tạo</Title>}
            >
                <Descriptions.Item label="Hạng bằng lái">
                    <strong>{student.hangbang}</strong>
                </Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">
                    <strong>{student.mobile}</strong>
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                {/* @ts-ignore */}
                    <strong>{status[student.trangthai]}</strong>
                </Descriptions.Item>
                <Descriptions.Item label="Báo cáo 1">
                    <strong>{student.baocao1?.name || 'Không có thông tin'}</strong>
                </Descriptions.Item>
                <Descriptions.Item label="Báo cáo 2">
                    <strong>{student.baocao2?.name || 'Không có thông tin'}</strong>
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}
export default BasicInfo