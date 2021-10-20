import React from 'react'
import {
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core'
import {
  makeStyles
} from '@material-ui/styles'
import { More } from '@material-ui/icons'

const useStyle = makeStyles({
  root: {
    display: 'flex'
  }
})

const StockProductToolbar = () => {
  const cls = useStyle()
  return (
    <div>
      <Toolbar className={cls.root}>
        <Typography style={{ flexGrow: 1}} variant="h6">
          Tồn kho
        </Typography>
        <span style={{ flexGrow: 1}}>{` `}</span>
        <IconButton color="primary">
          <More />
        </IconButton>
      </Toolbar>
    </div>
  )
}
export default StockProductToolbar
