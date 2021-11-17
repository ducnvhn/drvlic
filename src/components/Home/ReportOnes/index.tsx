import React from 'react';
import {
    PageHeader,
    Button,
    Space,
    Pagination
} from 'antd'
import {
    FilterOutlined,
    PlusOutlined
} from '@ant-design/icons'
import {
    // gql,
    useMutation,
    useLazyQuery
} from '@apollo/client'
import CreateReportModal from'./CreateReportModal'
import ReportList from './ReportList/ReportList'
import ReportFileterModal from './Modals/FilterReportModal'
import {
    notFilterEmpty
} from '../../common/utils'


// const CREATE_A_REPORT = gql `
//     mutation createAReport($report: ReportOneInput) {
//         createAReport(report: $report) {
//             _id
//             hangbang
//             name
//             desc
//             status
//             created
//             createdBy {
//                 name
//             },
//             stdCount
//         }
//     }
// `
// const LOAD_A_REPORT = gql `
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
type ReportType = {
    createQuery: {
        reportKey: string,
        query: any
    }
    loadQuery: {
        reportKey: string,
        query: any
    }
    title: string,
    type: string
}
const ReportOnes:React.FC<ReportType> = ({
    createQuery,
    loadQuery,
    title,
    type
}) => {
    const limit = 50
    // const [createReportOne] = useMutation(CREATE_A_REPORT)
    const [createReportOne] = useMutation(createQuery.query, {refetchQueries: [loadQuery.query]})
    const [createMdl, toggleCreateMdl] = React.useState(false)
    // const [loadAReports, {data: reportData}] = useLazyQuery(LOAD_A_REPORT)
    const [loadAReports, { data: reportData }] = useLazyQuery(loadQuery.query)
    const [filterModal, toggleFilterModal] = React.useState(false)
    const [filter, setFilter] = React.useState<Record<string,any>>({
        name: null,
        desc: null,
        hangbang: null,
        status: null
    })
    const [page, setPage] = React.useState(1)
    React.useEffect(() => {
        const loadReports = async () => {
            await loadAReports({
                variables: {
                    filter,
                    page,
                    limit
                }
            })
        }
        loadReports()
    }, [ loadAReports, filter, page, limit ])

    const createReport = async (report: Record<string,any>) => {
        await createReportOne({
            variables: {
                report
            }
        })
        toggleCreateMdl(false)
    } 

    const onToggleFilter = () => {
        if (notFilterEmpty(filter)) {
            setFilter({
                name: null,
                desc: null,
                hangbang: null,
                status: null
            })
        } else {
            toggleFilterModal(true)
        }
    }
    return (
        <div>
            <PageHeader
                title={title}
                extra={[
                    <Button shape="round" key="_add" type="primary" onClick={() => toggleCreateMdl(true)}>
                        <PlusOutlined />
                    </Button>,
                    <Button danger={notFilterEmpty(filter)} key="_filter" shape="round" onClick={() => onToggleFilter()}>
                        <FilterOutlined />
                        {/* {notFilterEmpty(filter) ? 'Xóa bộ lọc' : 'Lọc báo cáo'} */}
                    </Button>
                ]}
            />
            {reportData && reportData[loadQuery.reportKey] && (
                <Space direction="vertical" style={{width: '100%'}}>
                    <ReportList
                        type={type}
                        reports={reportData[loadQuery.reportKey as keyof Object].reports}
                    />
                    <Pagination
                        current={page}
                        onChange={(page: number) => setPage(page)}
                        total={reportData[loadQuery.reportKey as keyof Object].total}
                        pageSize={limit}
                    />
                </Space>
            )}
            <CreateReportModal
                type={type}
                visible={createMdl}
                onCancel={() => toggleCreateMdl(false)}
                onOk={(report) => createReport(report)}
            />
            <ReportFileterModal
                filter={filter}
                visible={filterModal}
                onCancel={() => toggleFilterModal(false)}
                onOk={(filter: Record<string,any>) => setFilter(filter)}
            />
        </div>
    )
}
export default ReportOnes