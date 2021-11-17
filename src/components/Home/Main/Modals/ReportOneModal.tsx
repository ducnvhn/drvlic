import React from 'react'
import {
    Modal,
    List
} from 'antd'
import {
    // gql,
    useLazyQuery
} from '@apollo/client'
import LoadinCenter from '../../../common/LoadingCenter'

// const LOAD_A_REPORT = gql`
//     query loadAReport($filter: ReportFilter, $page: Int, $limit: Int) {
//         loadAReport(filter: $filter, page: $page, limit: $limit) {
//             reports {
//                 _id
//                 hangbang
//                 name
//                 desc
//                 status
//                 createdBy {
//                     name
//                 },
//                 stdCount
//                 created
//             }
//             total
//         }
//     }
// `

type ModalType = {
    visible: boolean
    onCancel: () => void
    onOk: () => void,
    onMove: (report: string) => void
    query: any
    dataKey: string
}

const ReportListModal:React.FC<ModalType> = ({
    visible,
    onCancel,
    onOk,
    onMove,
    query,
    dataKey
}) => {
    const [loadReports, { loading, data }] = useLazyQuery(query,{fetchPolicy: 'network-only'})
    const [moving, toggleMoving] = React.useState(false)

    React.useEffect(() => {
        const load = async () => {
            await loadReports({
                variables: {
                    filter: {
                        status: 'PENDING',
                    }
                }
            })
        }
        if (visible) {
            load()
        }
    }, [visible, loadReports])

    const moveStds = async (report: string) => {
        toggleMoving(true)
        await onMove(report)
        toggleMoving(false)
        onCancel()
    }
    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            onOk={onOk}
            title="Chọn báo cáo"
        >
            {(loading || moving) && (
                <LoadinCenter />
            )}
            {data && data[dataKey as keyof Object] && (
                <List
                    dataSource={data[dataKey as keyof Object].reports}
                    renderItem={(item: any) => (
                        <List.Item
                            onClick={() => moveStds(item._id)}
                            actions={[
                                <strong>{item.stdCount}</strong>
                            ]}
                            style={{cursor: 'pointer'}}
                        >
                            <List.Item.Meta
                                title={item.name}
                                description={item.desc}
                            />
                        </List.Item>
                    )}
                />
            )}
        </Modal>
    )
}
export default ReportListModal