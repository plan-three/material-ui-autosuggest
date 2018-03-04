/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'
import Autosuggest, { defaultProps } from './'

const requiredProps = {
	onChange: () => {},
	suggestions: []
}

const testProps = {
	suggestions: [
		{
			value: 'foo'
		},
		{
			value: 'bar'
		},
		{
			value: 'baz'
		}
	],
	fuzzySearchOpts: {
		...defaultProps.fuzzySearchOpts,
		keys: [ 'value' ]
	},
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
		it('Should call `props.onBlur()` with the current value', () => {
			const onBlur = jest.fn()
			const wrapper = mount(<Autosuggest {...requiredProps} onBlur={onBlur} />)
			wrapper.find('Input').simulate('focus')
			wrapper.find('Input').simulate('blur')
			expect(onBlur).toHaveBeenCalledWith('')
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
		it('Should use the provided renderInput function by default', () => {
			const props = {
				...testProps,
				onChange: jest.fn()
			}
			const wrapper = mount(<Autosuggest {...props} />)
			const renderSpy = jest.spyOn(wrapper.find('Autosuggest').at(0).instance(), 'renderInput')
			wrapper.find('input').simulate('change', { target: { value: 'f' } })
			expect(renderSpy).toHaveBeenCalled()
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
		it('Should use the provided renderSuggestion function by default', () => {
			const props = {
				...testProps,
				onChange: jest.fn()
			}
			const wrapper = mount(<Autosuggest {...props} />)
			const renderSpy = jest.spyOn(wrapper.find('Autosuggest').at(0).instance(), 'renderSuggestion')
			wrapper.find('input').simulate('focus')
			wrapper.find('input').simulate('change', { target: { value: 'f' } })
			expect(renderSpy).toHaveBeenCalled()
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
		it('Should use the provided renderSuggestionsContainer function by default', () => {
			const props = {
				...testProps,
				onChange: jest.fn()
			}
			const wrapper = mount(<Autosuggest {...props} />)
			const renderSpy = jest.spyOn(wrapper.find('Autosuggest').at(0).instance(), 'renderSuggestionsContainer')
			wrapper.find('input').simulate('focus')
			wrapper.find('input').simulate('change', { target: { value: 'fo' } })
			expect(renderSpy).toHaveBeenCalled()
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
