import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AppErrorMessage from '../AppErrorMessage.vue'
import AppSelect from '../AppSelect.vue'

describe('AppSelect', () => {
  const factory = (props = {}, attrs = {} ) => {
    return mount(AppSelect, {
      global: {
        components: { AppErrorMessage }
      },     
      props: {
        options: [],
        ...props
      },
      attrs: { ...attrs } 
    })
  }
  
  it('should be initialized blank and no title', () => {
    const wrapper = factory()
    
    expect(wrapper.html()).not.toContain('Title')
    expect(wrapper.find('label').exists()).toBe(false)
    expect(wrapper.props()).toEqual(
      { error: '', options: [], label: '', modelValue: '' }
    )
  })
  
  it('should render label by passing property to', () => {
    const wrapper = factory({ label: 'Title' })
    const label = wrapper.find('label')

    expect(label.exists()).toBe(true)
    expect(label.html()).toContain('Title')
    expect(wrapper.props().label).toEqual('Title')    
  })
  
  it('should emit empty value by default when fire', async () => {
    const wrapper = factory()     

    await wrapper.find('select').trigger('change')

    expect(
      wrapper.emitted()['update:modelValue'][0][0]
    ).toEqual('')
  })
  
  it('should emit value which is set manually and fire', async () => {
    const wrapper = factory({
      options: [
        {id: '1', name: 'bar'},
        {id: '2', name: 'baz'},
        {id: '3', name: 'foo'}
      ]
    })
    const select = wrapper.find('select')
    
    await select.setValue('2')
    await select.trigger('change')

    expect(
      wrapper.emitted()['update:modelValue'][0][0]
    ).toEqual('2')
  })
  
  it('should emit value which is set by property and fire', async () => {
    const wrapper = factory({
      modelValue: '2',
      options: [
        {id: '1', name: 'bar'},
        {id: '2', name: 'baz'},
        {id: '3', name: 'foo'}
      ]
    })
    const select = wrapper.find('select')
    
    await select.trigger('change')

    expect(
      wrapper.emitted()['update:modelValue'][0][0]
    ).toEqual('2')
  })
  
  it('should set the attributes to the select element', () => {
    const wrapper = factory({ label:'Title' })
    const select = wrapper.find('select')
    const label = wrapper.find('label')
    
    expect(label.attributes()).toEqual({})
    expect(select.attributes()).toEqual(
      { class: 'field', id: '6', value: '' } // uuid
    )
  })
  
  it('this should set the attributes to the input element too', () => {
    const wrapper = factory( { label: 'Title' })
    const select = wrapper.find('select')
    const label = wrapper.find('label')    
    
    expect(label.attributes()).toEqual({})
    expect(select.attributes()).toEqual(
      { class: 'field', id: '7', value: '' } // uuid
    )
  })
  
  it('setSelected demo', async () => {
    const wrapper = factory({
      modelValue: '2',
      options: [
        {id: '1', name: 'bar'},
        {id: '2', name: 'baz'},
        {id: '3', name: 'foo'}
      ]
    })
    const options = wrapper.find('select').findAll('option')

    await (options.at(3) ).setValue()

    expect((wrapper.find('option:checked').element as HTMLSelectElement).value).toBe('3')
  })
 
})
