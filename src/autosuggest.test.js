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

	describe('renderInput()', () => {
		it('Should accept `props.renderInput`', () => {
			const props = {
				...testProps,
				onChange: jest.fn(),
				renderInput: jest.fn()
			}
			const wrapper = mount(<Autosuggest {...props} />)
			expect(wrapper.find('Autosuggest').at(0).instance().renderInput).toEqual(props.renderInput)
			expect(props.renderInput).toHaveBeenCalled()
		})
	})

	describe('renderSuggestion()', () => {
		it('Should accept `props.renderSuggestion`', () => {
			const props = {
				...testProps,
				onChange: jest.fn(),
				renderSuggestion: jest.fn()
			}
			const wrapper = mount(<Autosuggest {...props} />)
			expect(wrapper.find('Autosuggest').at(0).instance().renderSuggestion).toEqual(props.renderSuggestion)
		})
	})

	describe('renderSuggestionsContainer()', () => {
		it('Should accept `props.renderSuggestionsContainer`', () => {
			const props = {
				...testProps,
				onChange: jest.fn(),
				renderSuggestionsContainer: jest.fn()
			}
			const wrapper = mount(<Autosuggest {...props} />)
			expect(wrapper.find('Autosuggest').at(0).instance().renderSuggestionsContainer).toEqual(props.renderSuggestionsContainer)
		})
	})

	describe('onSuggestionsChange()', () => {
		it('Should call `props.onSuggestionsChange()` when suggestions change', () => {
			const props = {
				...testProps,
				onChange: jest.fn(),
				onSuggestionsChange: jest.fn()
			}
			const wrapper = mount(<Autosuggest {...props} />)
			wrapper.find('Autosuggest').at(0).instance().handleSuggestionsClearRequested()
			expect(props.onSuggestionsChange).toHaveBeenCalledWith([])
		})
	})
})
