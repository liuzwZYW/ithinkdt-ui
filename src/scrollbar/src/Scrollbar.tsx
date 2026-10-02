import type { ScrollbarProps } from '../../_internal/scrollbar/src/Scrollbar'

import NScrollbar from '../../_internal/scrollbar/src/Scrollbar'

export type {
  ScrollbarInst,
  ScrollbarProps,
  ScrollBy,
  ScrollTo
} from '../../_internal/scrollbar/src/Scrollbar'

export const scrollbarProps = NScrollbar.props as ScrollbarProps

export default NScrollbar
