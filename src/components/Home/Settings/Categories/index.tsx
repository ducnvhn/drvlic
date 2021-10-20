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
  Divider
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
// import { AddCircle } from '@material-ui/icons'

interface UnitsProps {
  updating: boolean
  updateKey: string
  categories: string[]
  updateSettings: (key: string, value: string[] | number) => void
}

const CategoriesSettings:React.FC<UnitsProps> = ({
  updating,
  updateKey,
  categories,
  updateSettings
}) => {
  const [newCat, setNewCat] = React.useState('')
  const [removing, setRemoveCat] = React.useState('')
  const [action, setAction] = React.useState('')

  const addNewCat = async (e:React.KeyboardEvent) => {
    if (e.key.toLowerCase() === 'enter') {
      setAction('add')
      // console.log(newUnit)
      const newCats: string[] = [newCat].concat(categories)
      await updateSettings('categories', newCats)
      setNewCat('')
    }
    setAction('')
  }
  const removeCat = async (unit: string) => {
    setAction('remove')
    setRemoveCat(unit)
    const newCats = categories.filter(c => c !== unit)
    await updateSettings('categories', newCats)
    setRemoveCat('')
    setAction('')
  }
  const updateNewUnit = (e: React.ChangeEvent<HTMLInputElement>) => setNewCat(e.target.value)
  return (
    <Card>
      <CardHeader
        title={(
          <Typography variant="h5">
            Đơn vị
          </Typography>
        )}
      />
      <CardContent>
        <TextField
          value={newCat}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => updateNewUnit(e)}
          onKeyDown={e => addNewCat(e)}
          helperText="Nhấn phím Enter để thêm"
          label="Thêm danh mục mới"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: updating && updateKey === 'categories' && action === 'add' ? <CircularProgress size={30} /> : null
          }}
        />
        <List>
          <ListSubheader>
            Danh mục đã có:
          </ListSubheader>
          <Divider />
          {categories.map(c => (
            <ListItem key={c}>
              <ListItemText
                primary={c}
                data-testid="catitem"
              />
              <ListItemSecondaryAction>
                <IconButton size="small" onClick={() => removeCat(c)}>
                  {removing === c && action === "remove" ? <CircularProgress size={20} /> : <Delete />}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
export default CategoriesSettings