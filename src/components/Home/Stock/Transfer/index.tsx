import React from 'react'
import Toolbar from '../Import/Comps/StockToolbar'
import moment from 'moment'
import CreateTransferModal from './Comps/CreateTransferModal'

const defaultFilter:Record<string,any> = {
  start: moment().startOf('month').toDate(),
  end: moment().toDate(),
  to: undefined,
  note: undefined,
  invoice: undefined
}

const Transfer = () => {
  const [filter, setFilter] = React.useState(defaultFilter)
  const [tModal, toggleTmodal] = React.useState(false)

  const onDateChange = (key: string, value: any) => {
    const newFilter = { ...filter }
    newFilter[key] = value
    setFilter(newFilter)
  }
  return (
    <div>
      <Toolbar
        onDateChange={onDateChange}
        filter={filter}
        action={() => toggleTmodal(true)}
      />
      <CreateTransferModal
        open={tModal}
        onClose={() => toggleTmodal(false)}
        onCreate={()=>null}
      />
    </div>
  )
}

export default Transfer
