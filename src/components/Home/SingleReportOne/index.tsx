import React from 'react'
import {
    Button,
    message,
    PageHeader
} from 'antd'
import {
    useParams
} from 'react-router-dom'
import {
    // gql,
    useLazyQuery,
    useMutation
} from '@apollo/client'
import LoadinCenter from '../../common/LoadingCenter'
import BasicInfor from './BasicInfor'
import StudentsList from './StudentsList'
import {
    useAuth
} from '../../../context/AuthenticationContext'
import { CheckOutlined } from '@ant-design/icons'

type ReportOneType = {
    loadReport: any,
    approveReport: any,
    markComplete: any,
    addStd: any,
    removeStd: any
    dataKey: string
    type: string
}

const SingleAttReport:React.FC<ReportOneType> = ({
    loadReport,
    approveReport,
    markComplete,
    addStd,
    removeStd,
    dataKey,
    type
}) => {
    const { getUser } = useAuth()
    const user = getUser()
    const params:any = useParams()
    const [loadR, { loading, data }] = useLazyQuery(loadReport)
    const [approveR, { loading: approving }] = useMutation(approveReport, { refetchQueries: [loadReport]})
    const [markCompleted] = useMutation(markComplete, { refetchQueries: [loadReport]})
    const [addToR1] = useMutation(addStd, {
        refetchQueries: [loadReport]
    })
    const [removeStds] = useMutation(removeStd, {
        refetchQueries: [loadReport]
    })
    const [filter, setFilter] = React.useState<Record<string,any>>({
        randomId: null,
        ten: null,
        mobile: null
    })

    React.useEffect(() => {
        const load = async () => {
            await loadR({
                variables: {
                    report: params.id,
                    filter
                }
            })
        }
        load()
    }, [loadR, params, filter])
    // const { id } = params

    const removeStudents = async (students: string[]) => {
        try {
            await removeStds({
                variables: {
                    students,
                    report: data[dataKey as keyof Object].report._id
                },
                update: () => {}
            })
            message.success('Loại hồ sơ thành công')
        } catch (e) {
            message.error('Không thể loại hồ sơ khỏi báo cáo - vui lòng kiểm tra lại')
        }
    } 

    const addStudents = async (students: string[]) => {
        try {
            const { report } = data[dataKey as keyof Object]
            if (!report || !report._id) {
                throw new Error('Báo cáo không hợp lệ')
            }
            addToR1({
                variables: {
                    students,
                    report: report._id
                }
            })
            message.success('Thêm vào báo cáo thành công')
        } catch (e) {
            message.error('Không thể thêm vào báo cáo')
        }
    }

    const markComp = async (students: string[]) => {
        try {
            await markCompleted({
                variables: {
                    students
                }
            })
            message.success('Đã Đánh dấu hoàn thành')
        } catch (e) {
            message.error('không thể thực hiện được thao tác')
        }
    }

    const approve = async () => {
        if (!data || !data[dataKey as keyof Object]) {
            message.error('Không thể duyệt được báo cáo')
        } else {
            try {
                await approveR({
                    variables: {
                        report: data[dataKey as keyof Object].report._id
                    }
                })
                message.success('Phê duyệt thành công')
            } catch (e) {
                message.error('Không thể duyệt được báo cáo')
            }
        }
    }

    if (loading) {
        return <LoadinCenter />
    }
    const extra = []
    if (user.role === 'MANAGER') {
        extra.push(
            (
                <Button onClick={() => approve()} loading={approving} type="primary" shape="round">
                    <CheckOutlined />
                    Phê duyệt
                </Button>
            )
        )
    }
    if (data && data[dataKey as keyof Object]) {
        return (
            <div>
                <PageHeader title={`Báo cáo`} extra={extra} />
                <BasicInfor report={data[dataKey as keyof Object].report} />
                <StudentsList
                    type={type}
                    report={data[dataKey as keyof Object].report}
                    filter={filter}
                    setFilter={setFilter}
                    students={data[dataKey as keyof Object].students}
                    removeStudents={removeStudents}
                    addStudents={addStudents}
                    markComp={markComp}
                />
            </div>
        )
    }
    return null
}
export default SingleAttReport