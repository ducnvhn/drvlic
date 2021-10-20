import React from 'react'
import {
  GridRenderCellParams
} from '@mui/x-data-grid'
import {
  TextField,
  MenuItem
} from '@material-ui/core'

export const renderSelectCell = (props: GridRenderCellParams, options: string[]) => {
  const { api, id, field } = props
  // console.log(api)
  // @ts-ignore
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value)
    // api.
    const event = {
      type:"keydown",
      code:"Enter"
    }
    // @ts-ignore
    api.setEditCellValue({ id, field, value: evt.target.value }, evt)
    api.commitCellChange({ id, field }, event as React.KeyboardEvent)
    api.setCellMode(id, field, 'view')
  }
  return (
    <TextField
      variant="outlined"
      select
      fullWidth
      onChange={handleChange}
      defaultValue={''}
      >
        {options.map(option => (
          <MenuItem value={option} key={option}>{option}</MenuItem>
        ))}
      </TextField>
  )
}