import React from 'react'
import {
    Modal,
    List,
    message
} from 'antd'
import {
    gql,
    useMutation,
    useLazyQuery
} from '@apollo/client'
import {
    T_REQUEST_SWAP
} from '../../../common/ClientQueries'
import { CheckOutlined } from '@ant-design/icons'

const LOAD_SWAP_STDS = gql `
    query loadStudents($filter: FilterInput) {
        loadStudents(filter: $filter) {
            students {
                _id
                ten
                randomId
                mobile
            }
        }
    }
`


type CType = {
    visible: boolean
    onCancel: () => void
    onOk: () => void,
    student: string
}

const SwapModal: React.FC<CType> = ({
    visible,
    onCancel,
    onOk,
    student
}) => {
    const [requestSwp, { loading }] = useMutation(T_REQUEST_SWAP)
    const [loadStudents, { loading: loadingStd, data }] = useLazyQuery(LOAD_SWAP_STDS, { fetchPolicy: 'network-only'})
    const [selected, setSelected] = React.useState('')
    React.useEffect(() => {
        const load = async () => {
            await loadStudents({
                variables: {
                    filter: {
                        trangthai: 'CHO_VAO_BC_1'
                    }
                }
            })
        }
        if (visible) {
            load()
        }
    }, [loadStudents, visible])

    const onSwap = async (replacement: string) => {
        try {
            await requestSwp({
                variables: {
                    student,
                    replacement
                }
            })
            message.success('Yêu cầu đổi chỗ thành công')
            onCancel()
        } catch (error) {
            message.error('Không thể yêu cầu đổi chỗ, vui lòng kiểm tra lại thông tin')
        }
    }

    return (
        <Modal
            title="Yêu cầu đổi chỗ"
            visible={visible}
            onCancel={onCancel}
            onOk={() => onSwap(selected)}
            okButtonProps={{ loading }}
        >
            {loadingStd && <span>Loading....</span>}
            {data && (
                <List
                    dataSource={data.loadStudents.students}
                    renderItem={(item:any) => (
                        <List.Item
                            actions={selected === item._id ? [<CheckOutlined twoToneColor="blue" />] : []}
                            key={item._id}
                            style={{ cursor: 'pointer'}}
                            onClick={() => setSelected(item._id)}
                        >
                            <List.Item.Meta title={`${item.ten} - ${item.mobile}`} description={item.randomId} />
                        </List.Item>
                    )}
                />
            )}
        </Modal>
    )
}

export default SwapModal