import React from 'react'
import {
  Icon
} from '@material-ui/core'
import {
  makeStyles
} from '@material-ui/styles'

const useStyle = makeStyles({
  iconRoot: {
    textAlign: 'center'
  },
  imageIcon: {
    width: '100%'
  }
})

interface IProps {
  src: string
}

export const MedBoxIcon:React.FC<IProps> = ({ src }) => {
  const classes = useStyle()
  return (
    <Icon classes={{root: classes.iconRoot}}>
      <img alt="custom icon" className={classes.imageIcon} src={src}/>
    </Icon>
  )
}
export const CustomIcon:React.FC<IProps> = ({ src }) => {
  const classes = useStyle()
  return (
    <Icon classes={{root: classes.iconRoot}}>
      <img alt="custom icon" className={classes.imageIcon} src={src} />
    </Icon>
  )
}
export const MedShopIcon:React.FC<IProps> = ({ src }) => {
  const classes = useStyle()
  return (
    <Icon classes={{root: classes.iconRoot}}>
      <img alt="custom icon" className={classes.imageIcon} src={src}/>
    </Icon>
  )
}

