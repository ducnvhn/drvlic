import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  // IconButton,
  TextField,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  CircularProgress,
  ListSubheader,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
// import { AddCircle } from '@material-ui/icons'

interface UnitsProps {
  label: string,
  title: string,
  compKey: string
  updating: boolean
  updateKey: string
  data: string[]
  updateSettings: (key: string, value: string[] | number) => void
}

const UnitSettings:React.FC<UnitsProps> = ({
  label,
  title,
  compKey,
  updating,
  updateKey,
  data,
  updateSettings
}) => {
  const [newUnit, setNewUnit] = React.useState('')
  const [removing, setRemoveUnit] = React.useState('')
  const [action, setAction] = React.useState('')
  const [confirmModal, toggleConfirmModal] = React.useState(false)

  const addNewUnit = async (e:React.KeyboardEvent) => {
    if (e.key.toLowerCase() === 'enter') {
      setAction('add')
      // console.log(newUnit)
      const newUnits: string[] = [newUnit].concat(data)
      await updateSettings(compKey, newUnits)
      setNewUnit('')
    }
    setAction('')
  }

  const openModal = (u:string) => {
    setRemoveUnit(u)
    toggleConfirmModal(true)
  }
  const closeModal = () => {
    setRemoveUnit('')
    toggleConfirmModal(false)
  }
  const removeUnit = async () => {
    setAction('remove')
    // setRemoveUnit(unit)
    const newUnits = data.filter(u => u !== removing)
    await updateSettings(compKey, newUnits)
    // setRemoveUnit('')
    setAction('')
    closeModal()
  }
  const updateNewUnit = (e: React.ChangeEvent<HTMLInputElement>) => setNewUnit(e.target.value)
  return (
    <Card>
      <CardHeader
        title={(
          <Typography variant="h5">
            {title}
          </Typography>
        )}
      />
      <CardContent>
        <TextField
          value={newUnit}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => updateNewUnit(e)}
          onKeyDown={e => addNewUnit(e)}
          helperText="Nhấn phím Enter để thêm"
          label={label}
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: updating && updateKey === compKey && action === 'add' ? <CircularProgress size={30} /> : null
          }}
        />
        <List>
          <ListSubheader>
            Đơn vị đã có:
          </ListSubheader>
          <Divider />
          {data.map(u => (
            <ListItem key={u} data-testid="unititem">
              <ListItemText
                primary={u}
              />
              <ListItemSecondaryAction>
                {/* <IconButton size="small" onClick={() => removeUnit(u)}> */}
                <IconButton size="small" onClick={() => openModal(u)}>
                  {removing === u && action === "remove" ? <CircularProgress size={20} /> : <Delete />}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Dialog
        open={confirmModal}
      >
        <DialogTitle>
          <Typography variant="h6">Xóa đơn vị này</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Các sản phẩm đã được gán đơn vị này sẽ vẫn giữ đơn vị cũ
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeModal()} color="primary" variant="outlined">Cancel</Button>
          <Button onClick={() => removeUnit()} color="secondary" variant="contained">
            {removing && action === "remove" ? <CircularProgress size={20} /> : 'Xóa'}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}
export default UnitSettings