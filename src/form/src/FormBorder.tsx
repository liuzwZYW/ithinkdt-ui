import type { ThemeProps } from '../../_mixins'
import type { FormValidationStatus } from '../../form/src/public-types'
import type { FormBorderInst } from './interface'
import { useMemo } from 'vooks'
import {
  computed,
  type CSSProperties,
  defineComponent,
  h,
  type PropType,
  ref,
  type SlotsType,
  type VNode
} from 'vue'
import { useConfig, useFormItem, useTheme, useThemeClass } from '../../_mixins'
import { useRtl } from '../../_mixins/use-rtl'
import {
  call,
  type ExtractPublicPropTypes,
  type MaybeArray
} from '../../_utils'
import { formLight, type FormTheme } from '../styles'
import style from './styles/form-border.cssr'

export const formBorderProps = {
  ...(useTheme.props as ThemeProps<FormTheme>),
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  status: String as PropType<FormValidationStatus>,
  onFocus: [Function, Array] as PropType<MaybeArray<(e: FocusEvent) => void>>,
  onBlur: [Function, Array] as PropType<MaybeArray<(e: FocusEvent) => void>>,
  onClick: [Function, Array] as PropType<MaybeArray<(e: MouseEvent) => void>>
}

export type FormBorderProps = ExtractPublicPropTypes<typeof formBorderProps>

export interface FormBorderSlots {
  'clear-icon'?: () => VNode[]
  count?: (props: { value: string }) => VNode[]
  'password-invisible-icon'?: () => VNode[]
  'password-visible-icon'?: () => VNode[]
  prefix?: () => VNode[]
  separator?: () => VNode[]
  suffix?: () => VNode[]
  default?: () => VNode[]
}

export default defineComponent({
  name: 'FormBorder',
  props: formBorderProps,
  slots: Object as SlotsType<FormBorderSlots>,
  setup(props) {
    const {
      mergedClsPrefixRef,
      mergedBorderedRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props)
    const themeRef = useTheme(
      'Form',
      '-form-border',
      style,
      formLight,
      props,
      mergedClsPrefixRef
    )
    // dom refs
    const wrapperElRef = ref<HTMLElement | null>(null)

    // form-item
    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef, mergedStatusRef } = formItem
    // states
    const focusedRef = ref(false)
    const hoverRef = ref(false)

    // focus
    const mergedFocusRef = useMemo(() => {
      return focusedRef.value
    })

    function doBlur(e: FocusEvent): void {
      const { onBlur } = props
      const { nTriggerFormBlur } = formItem
      if (onBlur)
        call(onBlur, e)
      nTriggerFormBlur()
    }
    function doFocus(e: FocusEvent): void {
      const { onFocus } = props
      const { nTriggerFormFocus } = formItem
      if (onFocus)
        call(onFocus, e)
      nTriggerFormFocus()
    }
    function doClick(e: MouseEvent): void {
      const { onClick } = props
      if (onClick)
        call(onClick, e)
    }

    function handleClick(e: MouseEvent): void {
      doClick(e)
    }

    function focus(): void {
      if (mergedDisabledRef.value)
        return
      wrapperElRef.value?.focus()
      focusedRef.value = true
    }
    function blur(): void {
      if (wrapperElRef.value?.contains(document.activeElement)) {
        ;(document.activeElement as HTMLElement).blur()
      }
      else {
        focusedRef.value = false
      }
    }

    function handleMouseEnter(): void {
      hoverRef.value = true
    }
    function handleMouseLeave(): void {
      hoverRef.value = false
    }

    function handleWrapperBlur(e: FocusEvent): void {
      focusedRef.value = false
      doBlur(e)
    }
    function handleWrapperFocus(e: FocusEvent): void {
      focusedRef.value = true
      doFocus(e)
    }

    const exposedProps: FormBorderInst = {
      focus,
      blur
    }

    const rtlEnabledRef = useRtl('FormBorder', mergedRtlRef, mergedClsPrefixRef)
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: {
          color,
          borderRadius,
          border,
          borderDisabled,
          borderHover,
          borderFocus,
          colorDisabled,
          colorFocus,
          boxShadowFocus,
          colorFocusWarning,
          boxShadowFocusWarning,
          borderWarning,
          borderFocusWarning,
          borderHoverWarning,
          colorFocusError,
          boxShadowFocusError,
          borderError,
          borderFocusError,
          borderHoverError
        }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-color': color,
        '--n-border-radius': borderRadius,
        '--n-border': border,
        '--n-border-disabled': borderDisabled,
        '--n-border-hover': borderHover,
        '--n-border-focus': borderFocus,
        '--n-color-disabled': colorDisabled,
        '--n-color-focus': colorFocus,
        '--n-box-shadow-focus': boxShadowFocus,
        // form warning
        '--n-color-focus-warning': colorFocusWarning,
        '--n-box-shadow-focus-warning': boxShadowFocusWarning,
        '--n-border-warning': borderWarning,
        '--n-border-focus-warning': borderFocusWarning,
        '--n-border-hover-warning': borderHoverWarning,
        // form error
        '--n-color-focus-error': colorFocusError,
        '--n-box-shadow-focus-error': boxShadowFocusError,
        '--n-border-error': borderError,
        '--n-border-focus-error': borderFocusError,
        '--n-border-hover-error': borderHoverError
      }
    })

    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
          'form-border',
          computed(() => {
            const { value: size } = mergedSizeRef
            return size[0]
          }),
          cssVarsRef,
          props
        )
      : undefined

    return {
      ...exposedProps,
      // DOM ref
      wrapperElRef,
      // value
      rtlEnabled: rtlEnabledRef,
      mergedFocus: mergedFocusRef,
      mergedSize: mergedSizeRef,
      mergedDisabled: mergedDisabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      mergedStatus: mergedStatusRef,
      handleClick,
      handleMouseEnter,
      handleMouseLeave,
      handleWrapperFocus,
      handleWrapperBlur,
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render() {
    const { mergedClsPrefix, mergedStatus, themeClass, onRender } = this
    const $slots = this.$slots as {
      default?: () => VNode[]
    }
    onRender?.()
    return (
      <div
        ref="wrapperElRef"
        class={[
          `${mergedClsPrefix}-form-border`,
          themeClass,
          mergedStatus
          && `${mergedClsPrefix}-form-border--${mergedStatus}-status`,
          {
            [`${mergedClsPrefix}-form-border--disabled`]: this.mergedDisabled,
            [`${mergedClsPrefix}-form-border--focus`]: this.mergedFocus
          }
        ]}
        style={this.cssVars as CSSProperties}
        tabindex={!this.mergedDisabled ? 0 : undefined}
        onFocus={this.handleWrapperFocus}
        onBlur={this.handleWrapperBlur}
        onClick={this.handleClick}
        onMousedown={this.handleWrapperFocus}
        onMouseenter={this.handleMouseEnter}
        onMouseleave={this.handleMouseLeave}
      >
        {$slots.default?.()}
        {/* border */}
        {this.mergedBordered ? (
          <div class={`${mergedClsPrefix}-form-border__border`} />
        ) : null}
        {this.mergedBordered ? (
          <div class={`${mergedClsPrefix}-form-border__state-border`} />
        ) : null}
      </div>
    )
  }
})
