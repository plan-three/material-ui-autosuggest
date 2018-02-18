import React from 'react'
import { TextField } from 'material-ui'

export default function renderInput(props) {
	const { classes, ref, inputLabelProps, label, fullWidth, helperText, error, ...otherProps } = props

	return (
		<TextField
			fullWidth={fullWidth}
			inputRef={ref}
			InputProps={{
				classes: {
					input: classes.input
				},
				error: error,
				...otherProps
			}}
			helperText={helperText}
			InputLabelProps={{ ...inputLabelProps, error }}
			FormHelperTextProps={{ error }}
			label={label}
		/>
	)
}
