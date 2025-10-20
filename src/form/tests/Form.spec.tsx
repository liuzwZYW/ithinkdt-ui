import type { FormInst } from '../index'
import type { FormBorderInst, FormValidateCallback } from '../src/interface'
import { mount } from '@vue/test-utils'
import { defineComponent, h, onMounted, ref } from 'vue'
import { NInput } from '../../input'
import { NForm, NFormBorder, NFormItem } from '../index'

describe('n-form', () => {
  it('should work with import on demand', () => {
    mount(NForm)
  })
  describe('require mark', () => {
    it('doesn\'t show by default', () => {
      const wrapper = mount(() => (
        <NForm>
          {{
            default: () => {
              return (
                <NFormItem label="star kirby">
                  {{
                    default: () => <NInput />
                  }}
                </NFormItem>
              )
            }
          }}
        </NForm>
      ))
      expect(wrapper.find('.n-form-item-label__asterisk').exists()).toEqual(
        false
      )
      wrapper.unmount()
    })
    it('shows when props.showRequireMark is set', () => {
      const wrapper = mount(() => (
        <NForm>
          {{
            default: () => {
              return (
                <NFormItem showRequireMark label="star kirby">
                  {{
                    default: () => <NInput />
                  }}
                </NFormItem>
              )
            }
          }}
        </NForm>
      ))
      expect(wrapper.find('.n-form-item-label__asterisk').exists()).toEqual(
        true
      )
      wrapper.unmount()
    })
    it('shows when required rule is set in form', () => {
      const wrapper = mount(() => (
        <NForm rules={{ starKirby: { required: true } }}>
          {{
            default: () => {
              return (
                <NFormItem label="star kirby" path="starKirby">
                  {{
                    default: () => <NInput />
                  }}
                </NFormItem>
              )
            }
          }}
        </NForm>
      ))
      expect(wrapper.find('.n-form-item-label__asterisk').exists()).toEqual(
        true
      )
      wrapper.unmount()
    })
    it('shows when required rule is set in form item', () => {
      const wrapper = mount(() => (
        <NForm>
          {{
            default: () => {
              return (
                <NFormItem label="star kirby" rule={{ required: true }}>
                  {{
                    default: () => <NInput />
                  }}
                </NFormItem>
              )
            }
          }}
        </NForm>
      ))
      expect(wrapper.find('.n-form-item-label__asterisk').exists()).toEqual(
        true
      )
      wrapper.unmount()
    })
    it('show require mark placement left when set require-mark-placement is "left"', () => {
      const wrapper = mount(() => (
        <NForm showRequireMark={true} requireMarkPlacement="left">
          {{
            default: () => {
              return (
                <NFormItem label="star kirby">
                  {{
                    default: () => <NInput />
                  }}
                </NFormItem>
              )
            }
          }}
        </NForm>
      ))
      const requireMark = wrapper.find('.n-form-item-label__asterisk')
      const nextSibling = requireMark.element.nextSibling as HTMLElement
      expect(nextSibling.textContent).toEqual('star kirby')
      wrapper.unmount()
    })

    it('show require mark placement left when set require-mark-placement is "right"', () => {
      const wrapper = mount(() => (
        <NForm showRequireMark={true} requireMarkPlacement="right">
          {{
            default: () => {
              return (
                <NFormItem label="star kirby">
                  {{
                    default: () => <NInput />
                  }}
                </NFormItem>
              )
            }
          }}
        </NForm>
      ))
      const requireMark = wrapper.find('.n-form-item-label__asterisk')
      const previousSibling = requireMark.element.previousSibling as HTMLElement
      expect(previousSibling.textContent).toEqual('star kirby')
      wrapper.unmount()
    })

    it('show require mark placement left when set require-mark-placement is "right" in form-item', () => {
      const wrapper = mount(() => (
        <NForm showRequireMark={true} requireMarkPlacement="left">
          {{
            default: () => {
              return (
                <NFormItem label="star kirby" requireMarkPlacement="right">
                  {{
                    default: () => <NInput />
                  }}
                </NFormItem>
              )
            }
          }}
        </NForm>
      ))
      const requireMark = wrapper.find('.n-form-item-label__asterisk')
      const previousSibling = requireMark.element.previousSibling as HTMLElement
      expect(previousSibling.textContent).toEqual('star kirby')
      wrapper.unmount()
    })
  })

  it('should work with `show-label` prop', async () => {
    let wrapper = mount(NForm, {
      slots: {
        default: () =>
          [1, 2, 3].map(num => (
            <NFormItem label={`label${num}`}>
              {{
                default: () => <NInput />
              }}
            </NFormItem>
          ))
      }
    })
    // show-label default is true in component
    expect(wrapper.findAll('.n-form-item-label').length).toBe(3)
    expect(wrapper.findAll('.n-form-item--no-label').length).toBe(0)

    await wrapper.setProps({ showLabel: true })
    expect(wrapper.findAll('.n-form-item-label').length).toBe(3)
    expect(wrapper.findAll('.n-form-item--no-label').length).toBe(0)

    await wrapper.setProps({ showLabel: false })
    expect(wrapper.findAll('.n-form-item-label').length).toBe(0)
    const noLabelItem = wrapper
      .findAll('.n-form-item')
      .filter(w => w.classes().includes('n-form-item--no-label'))
    expect(noLabelItem).toHaveLength(3)

    // The NFormItem show-label has a higher weight than the NForm
    wrapper = mount(NForm, {
      props: { showLabel: true },
      slots: {
        default: () => (
          <NFormItem label="label" show-label={false}>
            {{
              default: () => <NInput />
            }}
          </NFormItem>
        )
      }
    })
    expect(
      wrapper.find('.n-form-item').classes().includes('n-form-item--no-label')
    ).toBe(true)
    expect(wrapper.findAll('.n-form-item-label').length).toBe(0)
    wrapper.unmount()
  })

  it('includes `for` attribute in label', () => {
    const wrapper = mount(() => (
      <NForm>
        {{
          default: () => {
            return (
              <NFormItem label="star kirby" labelProps={{ for: 'input' }}>
                {{
                  default: () => <NInput />
                }}
              </NFormItem>
            )
          }
        }}
      </NForm>
    ))
    expect(wrapper.find('.n-form-item-label').attributes('for')).toBe('input')
    wrapper.unmount()
  })

  describe('form validation', () => {
    it('should form validation work with `level: \'warning\'` by async/await`', async () => {
      const wrapper = mount(
        defineComponent({
          setup() {
            return {
              formRef: ref<FormInst>(),
              formData: ref({
                warningOnly: '',
                throwException: ''
              })
            }
          },
          render() {
            return (
              <NForm
                ref="formRef"
                model={this.formData}
                rules={{
                  warningOnly: {
                    required: true,
                    level: 'warning',
                    message: 'warning!'
                  },
                  throwException: {
                    required: true,
                    message: 'error!'
                  }
                }}
              >
                {{
                  default: () => {
                    return [
                      <NFormItem label="warningOnly" path="warningOnly">
                        {{
                          default: () => (
                            <NInput
                              ref="warningInputRef"
                              value={this.formData.warningOnly}
                              onUpdateValue={(v) => {
                                this.formData.warningOnly = v
                              }}
                            />
                          )
                        }}
                      </NFormItem>,
                      <NFormItem label="throwException" path="throwException">
                        {{
                          default: () => (
                            <NInput
                              ref="errorInputRef"
                              value={this.formData.throwException}
                              onUpdateValue={(v) => {
                                this.formData.throwException = v
                              }}
                            />
                          )
                        }}
                      </NFormItem>
                    ]
                  }
                }}
              </NForm>
            )
          }
        })
      )

      const formRef = wrapper.vm.$refs.formRef as FormInst
      const validationError = [
        [
          {
            field: 'throwException',
            fieldValue: '',
            message: 'error!'
          }
        ]
      ]

      // show warning and error feedback, validate method rejected while empty form fields
      await expect(formRef.validate()).rejects.toMatchObject(validationError)

      expect(
        wrapper.find('.n-form-item-feedback.n-form-item-feedback--error').text()
      ).toBe('error!')

      expect(
        wrapper
          .find('.n-form-item-feedback.n-form-item-feedback--warning')
          .text()
      ).toBe('warning!')

      // only warning is shown, validate method resolved while error filed got value.
      await wrapper
        .findComponent({ ref: 'errorInputRef' })
        .find('input')
        .setValue('value')

      await expect(formRef.validate()).resolves.toMatchObject({
        warnings: [
          [{ field: 'warningOnly', fieldValue: '', message: 'warning!' }]
        ]
      })
      expect(
        wrapper
          .find('.n-form-item-feedback.n-form-item-feedback--warning')
          .text()
      ).toBe('warning!')

      expect(
        wrapper
          .find('.n-form-item-feedback.n-form-item-feedback--error')
          .exists()
      ).toBe(false)

      // either error nor warning was shown, validate method resolve while form filled.
      await wrapper
        .findComponent({ ref: 'warningInputRef' })
        .find('input')
        .setValue('value')

      await expect(formRef.validate()).resolves.toMatchObject({
        warnings: undefined
      })
      expect(
        wrapper
          .find('.n-form-item-feedback.n-form-item-feedback--warning')
          .exists()
      ).toBe(false)

      expect(
        wrapper
          .find('.n-form-item-feedback.n-form-item-feedback--error')
          .exists()
      ).toBe(false)

      wrapper.unmount()
    })

    it('should form validation work with `warningOnly` by callback', async () => {
      const wrapper = mount(
        defineComponent({
          setup() {
            return {
              formRef: ref<FormInst>(),
              formData: ref({
                warningOnly: '',
                throwException: ''
              })
            }
          },
          render() {
            return (
              <NForm
                ref="formRef"
                model={this.formData}
                rules={{
                  warningOnly: {
                    required: true,
                    level: 'warning',
                    message: 'warning!'
                  },
                  throwException: {
                    required: true,
                    message: 'error!'
                  }
                }}
              >
                {{
                  default: () => {
                    return [
                      <NFormItem label="warningOnly" path="warningOnly">
                        {{
                          default: () => (
                            <NInput
                              ref="warningInputRef"
                              value={this.formData.warningOnly}
                              onUpdateValue={(v) => {
                                this.formData.warningOnly = v
                              }}
                            />
                          )
                        }}
                      </NFormItem>,
                      <NFormItem label="throwException" path="throwException">
                        {{
                          default: () => (
                            <NInput
                              ref="errorInputRef"
                              value={this.formData.throwException}
                              onUpdateValue={(v) => {
                                this.formData.throwException = v
                              }}
                            />
                          )
                        }}
                      </NFormItem>
                    ]
                  }
                }}
              </NForm>
            )
          }
        })
      )

      const formRef = wrapper.vm.$refs.formRef as FormInst
      const validationError = [
        [
          {
            field: 'throwException',
            fieldValue: '',
            message: 'error!'
          }
        ]
      ]
      const validationWarning = [
        [
          {
            field: 'warningOnly',
            fieldValue: '',
            message: 'warning!'
          }
        ]
      ]

      async function validate(): Promise<Parameters<FormValidateCallback>> {
        return await new Promise<Parameters<FormValidateCallback>>(
          (resolve) => {
            void formRef
              .validate((errs, { warnings }) => {
                resolve([errs, { warnings }])
              })
              .catch(() => {})
          }
        )
      }
      // show warning and error feedback, validate method rejected while empty form fields
      expect(await validate()).toMatchObject([
        validationError,
        { warnings: validationWarning }
      ])

      expect(
        wrapper.find('.n-form-item-feedback.n-form-item-feedback--error').text()
      ).toBe('error!')

      expect(
        wrapper
          .find('.n-form-item-feedback.n-form-item-feedback--warning')
          .text()
      ).toBe('warning!')

      // only warning is shown, validate method resolved while error filed got value.
      await wrapper
        .findComponent({ ref: 'errorInputRef' })
        .find('input')
        .setValue('value')

      // show warning and error feedback, validate method rejected while empty form fields
      expect(await validate()).toMatchObject([
        undefined,
        { warnings: validationWarning }
      ])
      expect(
        wrapper
          .find('.n-form-item-feedback.n-form-item-feedback--warning')
          .text()
      ).toBe('warning!')

      expect(
        wrapper
          .find('.n-form-item-feedback.n-form-item-feedback--error')
          .exists()
      ).toBe(false)

      // either error nor warning was shown, validate method resolve while form filled.
      await wrapper
        .findComponent({ ref: 'warningInputRef' })
        .find('input')
        .setValue('value')

      expect(await validate()).toMatchObject([
        undefined,
        { warnings: undefined }
      ])

      expect(
        wrapper
          .find('.n-form-item-feedback.n-form-item-feedback--warning')
          .exists()
      ).toBe(false)

      expect(
        wrapper
          .find('.n-form-item-feedback.n-form-item-feedback--error')
          .exists()
      ).toBe(false)

      wrapper.unmount()
    })

    /** @see https://github.com/tusen-ai/naive-ui/issues/6068 */
    it('the validation status should be updated correctly', async () => {
      const wrapper = mount(
        defineComponent({
          setup() {
            return {
              formRef: ref<FormInst>(),
              formData: ref({
                input: 'other'
              })
            }
          },
          render() {
            return (
              <NForm
                ref="formRef"
                model={this.formData}
                rules={{
                  input: [
                    {
                      level: 'error',
                      validator(rule, value) {
                        if (value !== 'target') {
                          return new Error('error')
                        }
                        return true
                      }
                    },
                    {
                      level: 'warning',
                      validator() {
                        return new Error('warning')
                      }
                    }
                  ]
                }}
              >
                {{
                  default: () => (
                    <NFormItem path="input">
                      {{
                        default: () => (
                          <NInput
                            ref="inputRef"
                            value={this.formData.input}
                            onUpdateValue={(v) => {
                              this.formData.input = v
                            }}
                          />
                        )
                      }}
                    </NFormItem>
                  )
                }}
              </NForm>
            )
          }
        })
      )

      const formRef = wrapper.vm.$refs.formRef as FormInst
      async function validate(): Promise<Parameters<FormValidateCallback>> {
        return await new Promise<Parameters<FormValidateCallback>>(
          (resolve) => {
            void formRef
              .validate((errs, { warnings }) => {
                resolve([errs, { warnings }])
              })
              .catch(() => {})
          }
        )
      }

      await validate()
      expect(
        wrapper
          .find('.n-form-item-feedback.n-form-item-feedback--error')
          .exists()
      ).toBe(true)

      await wrapper
        .findComponent({ ref: 'inputRef' })
        .find('input')
        .setValue('target')

      await validate()
      expect(
        wrapper
          .find('.n-form-item-feedback.n-form-item-feedback--warning')
          .exists()
      ).toBe(true)

      wrapper.unmount()
    })
  })

  describe('n-form-border', () => {
    it('should work with import on demand', () => {
      mount(NFormBorder)
    })

    it('should work with `disabled` prop', async () => {
      const wrapper = mount(NFormBorder)
      expect(wrapper.find('.n-form-border').classes()).not.toContain(
        'n-form-border--disabled'
      )
      await wrapper.setProps({
        disabled: true
      })
      expect(wrapper.find('.n-form-border').classes()).toContain(
        'n-form-border--disabled'
      )
      wrapper.unmount()
    })

    it('should work with `status` prop', async () => {
      ;(['success', 'warning', 'error'] as const).forEach((status) => {
        const wrapper = mount(NFormBorder, { props: { status } })
        expect(wrapper.find('.n-form-border').classes()).toContain(
          `n-form-border--${status}-status`
        )
        wrapper.unmount()
      })
    })

    it('should work with `on-blur` prop', async () => {
      const onBlur = jest.fn()
      const wrapper = mount(NFormBorder, {
        props: { onBlur }
      })
      await wrapper.trigger('focus')
      await wrapper.trigger('blur')
      expect(onBlur).toHaveBeenCalled()
      wrapper.unmount()
    })

    it('should work with `on-focus` prop', async () => {
      const onFocus = jest.fn()
      const wrapper = mount(NFormBorder, {
        props: { onFocus }
      })
      await wrapper.trigger('focus')
      expect(onFocus).toHaveBeenCalled()
      wrapper.unmount()
    })

    it('should work with `blur` `focus` methods', async () => {
      const onBlur = jest.fn()
      const onFocus = jest.fn()
      const Mock = defineComponent({
        setup() {
          const formBorderInstRef = ref<FormBorderInst | null>(null)
          onMounted(() => {
            formBorderInstRef.value?.focus()
            formBorderInstRef.value?.blur()
          })
          return () => {
            return (
              <NFormBorder
                ref={formBorderInstRef}
                onBlur={onBlur}
                onFocus={onFocus}
              />
            )
          }
        }
      })

      const wrapper = mount(() => <Mock />)
      setTimeout(() => {
        expect(onBlur).toHaveBeenCalled()
        expect(onFocus).toHaveBeenCalled()
      }, 0)

      wrapper.unmount()
    })
  })
})
