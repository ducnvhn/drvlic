import React from 'react'
import {
    PageHeader,
    DatePicker,
    Button,
    
} from 'antd'
import moment, { Moment } from 'moment'

const { RangePicker } = DatePicker

type HType = {
    filter: Record<string, any>
    setFilter: (filter: Record<string, any>) => void
    loading: boolean
}

const RecordHeader:React.FC<HType> = ({
    filter,
    setFilter,
    loading
}) => {
    const [start, setStart] = React.useState<Moment|null>(null)
    const [end, setEnd] = React.useState<Moment|null>(null)

    const onDateChange = (d: any) => {
        const [start, end] = d
        console.log('start', start)
        setStart(start)
        console.log('end', end)
        setEnd(end)
    }

    const onConfirm = () => {
        // console.log(open)
        // console.log('start:', start)
        // console.log('end:', end)
        setFilter({
            ...filter,
            start: start?.startOf('day'),
            end: end?.endOf('day')
        })
    }
    return (
        <PageHeader
            title="Báo cáo thu chi"
            extra={[
                <span key="_label">Chọn khoảng thời gian</span>,
                <RangePicker
                    key="_rp"
                    format="DD/MM/YYYY"
                    defaultPickerValue={[moment().startOf('month'), moment().endOf('month')]}
                    value={[start, end]}
                    onChange={onDateChange}
                    // onOpenChange={onConfirm}
                />,
                <Button loading={loading} type="primary" onClick={onConfirm}>OK</Button>
            ]}
        />
    )
}
export default RecordHeader