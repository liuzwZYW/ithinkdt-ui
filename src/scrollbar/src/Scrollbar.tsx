import type {
  AllowedComponentProps,
  ComponentCustomProps,
  ExtractPropTypes,
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
  onScroll?: (e: Event) => void
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
  props: ScrollbarProps &
    VNodeProps &
    AllowedComponentProps &
    ComponentCustomProps
) => any

export default Scrollbar
