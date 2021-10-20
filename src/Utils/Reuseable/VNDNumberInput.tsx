import React from 'react'
import NumberFormat from 'react-number-format';

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export function VNDNumberInput (props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      // prefix="VNĐ"
      decimalScale={0}
      decimalSeparator=","
      thousandSeparator="."
      isNumericString
      allowNegative={false}
      allowLeadingZeros={false}
      allowEmptyFormatting={false}
    />
  )
}
// export default VNDNumberInput
export function NumberInput (props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      prefix=""
      thousandSeparator=","
      isNumericString
    />
  )
}
