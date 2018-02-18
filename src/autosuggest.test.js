/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'
import Autosuggest from './'

const requiredProps = {
	onChange: () => {},
	suggestions: [],
	searchKeys: []
}

const testProps = {
	suggestions: [
		{
			value: 'foo',
			item: {
				value: 'foo'
			}
		},
		{
			value: 'bar',
			item: {
				value: 'bar'
			}
		},
		{
			value: 'baz',
			item: {
				value: 'baz'
			}
		}
	],
	searchKeys: ['value'],
	labelKey: 'value'
}

describe('Autosuggest', () => {
	it('Should mount without failing', () => {
		expect(() => {mount(<Autosuggest {...requiredProps} />)}).not.toThrow()
	})
	it('Should call `props.onChange()` on change event', () => {
		const props = {
			...testProps,
			onChange: jest.fn()
		}
		const wrapper = mount(<Autosuggest {...props} value="" selectClosestMatch />)
		wrapper.find('input').simulate('change', {target: {value: 'bar'}})
		expect(props.onChange).toHaveBeenCalledWith('bar')
	})

	describe('handleBlur()', () => {
		it('Should call `props.onBlur()`', () => {
			const onBlur = jest.fn()
			const wrapper = mount(<Autosuggest {...requiredProps} onBlur={onBlur} />)
			wrapper.find('Input').simulate('focus')
			wrapper.find('Input').simulate('blur')
			expect(onBlur).toHaveBeenCalled()
		})
	})

	// describe('renderSuggestion()', () => {
	// 	it('Should render suggestions', () => {
	// 		const props = {
	// 			...testProps,
	// 			onChange: jest.fn()
	// 		}
	// 		const wrapper = mount(<Autosuggest {...props} />)
	// 		const spy = jest.spyOn(wrapper.find('Autosuggest').at(0).instance(), 'renderSuggestion')
	// 		wrapper.find('Input').simulate('focus')
	// 		wrapper.find('Input').simulate('keyDown', {key: 'b', keyCode: 66})
	// 		wrapper.find('Input').simulate('keyDown', {key: '1', keyCode: 65})
	// 		wrapper.find('Input').simulate('change', {target: {value: 'bar'}})
	// 		expect(spy).toHaveBeenCalled()
	// 	})
	// })
})
