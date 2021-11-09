import React from 'react'
import {
    Spin
} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

const LoadinCenter = () => {
    return (
        <div style={{
            textAlign: 'center',
            marginTop: '5em'
        }}>
            <Spin
                indicator={(
                    <LoadingOutlined style={{fontSize: 24}} />
                )}
            />
        </div>
    )
}
export default LoadinCenter
