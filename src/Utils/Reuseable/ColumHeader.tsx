import React from 'react'
import {
  Grid,
  Typography,
  IconButton,
  Tooltip
} from '@material-ui/core'
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
// import { ReactComponent as Filter } from './filter.svg'


export type ColProps = {
  name?: string
  icon?: React.ReactNode
  onClick?: () => void,
  showIcon?: boolean
  tooltip?: string
}

const ColumnFilter:React.FC<ColProps> = ({
  name,
  // icon,
  onClick,
  showIcon = false,
  tooltip = 'Click để thiết lập bộ lọc'
}) => {
  return (
    <Grid direction="row" justifyContent="flex-start" container className="MuiDataGrid-columnHeaderTitleContainer">
      <Grid item className="MuiDataGrid-columnHeaderTitle">
        <Typography variant="subtitle2">
          {name}
        </Typography>
      </Grid>
      <Grid item className="MuiDataGrid-iconButtonContainer">
        <Tooltip title={tooltip}>
          <IconButton onClick={onClick} color={showIcon ? 'secondary' : 'default'}>
            {/* {icon} */}
            <FilterIcon color={showIcon ? 'secondary' : 'disabled'} />
          </IconButton>
        </Tooltip>
      </Grid>
  </Grid>
  )
}
export default ColumnFilter

export function FilterIcon (props: SvgIconProps) {
  return (
    <SvgIcon {...props} style={{ fontSize: 14}}>
      <svg viewBox="-5 0 394 394.00003"  xmlns="http://www.w3.org/2000/svg"><path d="m367.820312 0h-351.261718c-6.199219-.0117188-11.878906 3.449219-14.710938 8.960938-2.871094 5.585937-2.367187 12.3125 1.300782 17.414062l128.6875 181.285156c.042968.0625.089843.121094.132812.183594 4.675781 6.3125 7.207031 13.960938 7.21875 21.816406v147.800782c-.027344 4.375 1.691406 8.582031 4.773438 11.6875 3.085937 3.101562 7.28125 4.851562 11.65625 4.851562 2.222656-.003906 4.425781-.445312 6.480468-1.300781l72.3125-27.570313c6.476563-1.980468 10.777344-8.09375 10.777344-15.453125v-120.015625c.011719-7.855468 2.542969-15.503906 7.214844-21.816406.042968-.0625.089844-.121094.132812-.183594l128.691406-181.289062c3.667969-5.097656 4.171876-11.820313 1.300782-17.40625-2.828125-5.515625-8.511719-8.9765628-14.707032-8.964844zm0 0"/></svg>
    </SvgIcon>
  )
}
export const ClearFilterIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg id="Capa_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><path d="m215.546 85.327h-162.264c-18.073 0-28.679 20.379-18.31 35.187.133.199-3.448-4.682 130.024 177.006 5.921 8.587 4.149-.599 4.149 190.987 0 19.245 21.993 30.358 37.542 18.791 57.536-43.372 71.516-48.257 71.516-70.955 0-133.909-1.721-130.311 4.149-138.823l27.851-37.923c-70.082-25.496-112.087-99.608-94.657-174.27z"/><path d="m281.951 30.166c-75.076 67.31-38.685 187.35 55.962 206.05 75.479 15.948 143.193-43.867 143.193-116.945 0-102.594-122.364-157.159-199.155-89.105zm118.529 106.804c9.515 9.466 2.715 25.676-10.603 25.676-8.014 0-10.022-3.79-28.462-22.158-18.064 17.984-20.27 22.158-28.472 22.158-13.349 0-20.063-16.264-10.603-25.676l17.769-17.699-17.769-17.699c-14.107-14.035 7.142-35.322 21.216-21.297l17.859 17.779 17.849-17.779c14.074-14.025 35.331 7.254 21.216 21.297l-17.769 17.699z"/></g></svg>
    </SvgIcon>
  )
}