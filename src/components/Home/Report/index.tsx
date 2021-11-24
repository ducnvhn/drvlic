import React from 'react'
import {
    PageHeader
} from 'antd'
import moment from 'moment'
import {
    useLazyQuery
} from '@apollo/client'
import LoadinCenter from '../../common/LoadingCenter'
import {
    LOAD_RECORDS
} from '../../common/ClientQueries'
import RecordsList from './comps/RecordsList'
import RecordHeader from './comps/RecordsHeader'


const Report = () => {
    const limit = 100
    const [loadRecords, { loading, data }] = useLazyQuery(LOAD_RECORDS)
    const [filter, setFilter] = React.useState<Record<string,any>>({
        start: moment().startOf('month'),
        end: moment().endOf('month'),
        page: 1,
        limit,
        ten: '',
        randomId: ''
    })

    React.useEffect(() => {
        const load = async () => {
            await loadRecords({
                variables: {
                    filter
                }
            })
        }
        load()
    }, [loadRecords, filter])
    return (
        <div>
            <RecordHeader
                filter={filter}
                setFilter={setFilter}
            />
            {/* {loading && (<LoadinCenter />)} */}
            {!loading && data && data.loadRecords && (
                <div>
                    <RecordsList
                        records={data.loadRecords}
                        filter={filter}
                        setFilter={setFilter}
                    />
                </div>
            )}
        </div>
    )
}
export default Report