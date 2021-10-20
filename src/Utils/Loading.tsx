import React from 'react'
import {
  Grid,
  CircularProgress
} from '@material-ui/core'
import {
  makeStyles
} from '@material-ui/styles'


const useStyle = makeStyles({
  blankContainer: {
    width: '100%',
    height: '100vh',
    background: '#fff'
  },
  spinnerContainer: {
    marginTop: '15em'
  }
})
const Loading = () => {
  const classes = useStyle()
  return (
    <Grid direction="column" alignItems="center" className={classes.blankContainer} container justifyContent="center">
      <Grid className={classes.spinnerContainer} item xs={12}>
        <CircularProgress />
      </Grid>
    </Grid>
  )
}

export default Loading