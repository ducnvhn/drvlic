import React from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
} 
function TabPanel(props: TabPanelProps) {
  const { children, index, value, ...rest } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...rest}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  )
}
export default TabPanel