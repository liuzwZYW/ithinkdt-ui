import type {
  AllowedComponentProps,
  ComponentCustomProps,
  ExtractPropTypes,
  PublicProps,
  ShallowUnwrapRef,
  VNode,
  VNodeChild,
  VNodeProps
} from 'vue'
import type { ScrollbarTheme } from '../../_internal/scrollbar/styles'
import type { ThemeProps } from '../../_mixins'
import { NScrollbar } from '../../_internal'

export interface ScrollTo {
  (x: number, y: number): void
  (options: { left?: number, top?: number, behavior?: ScrollBehavior }): void
}

export type ScrollBy = ScrollTo

export interface ScrollbarInst {
  scrollTo: ScrollTo
  scrollBy: ScrollBy
}
export type ScrollbarProps = Pick<
  ExtractPropTypes<ThemeProps<ScrollbarTheme>>,
  'themeOverrides'
> & {
  trigger?: 'none' | 'hover'
  xScrollable?: boolean
  onScroll?: (evt: Event) => void
  contentClass?: string
  contentStyle?: string | Record<string, any>
  size?: number
  xPlacement?: 'top' | 'bottom'
  yPlacement?: 'left' | 'right'
  abstract?: boolean
  container?: () => HTMLElement | null | undefined
  content?: () => HTMLElement | null | undefined
}
export const scrollbarProps = NScrollbar.props as ScrollbarProps

const Scrollbar = NScrollbar as unknown as (
  props: ScrollbarProps
    & VNodeProps
    & AllowedComponentProps
    & ComponentCustomProps
) => VNode & {
  __ctx?: {
    props: ScrollbarProps & VNodeProps & AllowedComponentProps & ComponentCustomProps & PublicProps
    emit: { (e: 'scroll', evt: Event): void }
    attrs: any
    slots: { default?: () => VNodeChild }
    expose: (exposed: ShallowUnwrapRef<ScrollbarInst>) => void
  }
}

export default Scrollbar
