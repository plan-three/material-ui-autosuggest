import React from 'react'
import PropTypes from 'prop-types'
import isPartHighlighted from '../lib/is-part-highlighted'

const HighlightedText = ({
	value,
	match
}) => {
	if (!match) return value
	return (
		<React.Fragment>
			{
				Array.from(value, (part, i) => {
					if (part === ' ') {
						return (<span key={String(i)} dangerouslySetInnerHTML={{__html: '&nbsp;'}} />)
					}
					const highlight = isPartHighlighted(i, match)
					const fontWeight = highlight ? 500 : 300
					return (
						<span key={String(i)} style={{ fontWeight }}>
							{part}
						</span>
					)
				})
			}
		</React.Fragment>
	)
}

HighlightedText.propTypes = {
	value: PropTypes.string.isRequired,
	match: PropTypes.object
}

export default HighlightedText
