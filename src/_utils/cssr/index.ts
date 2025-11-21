import type {
  CNode,
  CNodeChildren,
  CProperties,
  CRenderOption
} from 'css-render'
import { plugin as BemPlugin } from '@css-render/plugin-bem'
import { CssRender } from 'css-render'

const namespace = 'n'
const prefix = `.${namespace}-`
const elementPrefix = '__'
const modifierPrefix = '--'

const cssr = CssRender()
const plugin = BemPlugin({
  blockPrefix: prefix,
  elementPrefix,
  modifierPrefix
})
cssr.use(plugin)
const { c, find } = cssr
const { cB, cE, cM, cNotM } = plugin

function insideModal(style: CNode): CNode {
  return c(
    ({ props: { bPrefix } }) =>
      `${bPrefix || prefix}modal, ${bPrefix || prefix}drawer`,
    [style]
  )
}

function insidePopover(style: CNode): CNode {
  return c(({ props: { bPrefix } }) => `${bPrefix || prefix}popover`, [style])
}

function asModal(style: CProperties): CNode {
  return c(({ props: { bPrefix } }) => `&${bPrefix || prefix}modal`, style)
}

// child block
const cCB: typeof cB = ((...args: any[]) => {
  return c('>', [(cB as any)(...args)])
}) as any

function createKey<P extends string, S extends string>(
  prefix: P,
  suffix: S
): S extends 'default' ? P : `${P}${Capitalize<S>}` {
  return (prefix
    + (suffix === 'default'
      ? ''
      : suffix.replace(/^[a-z]/, startChar =>
          startChar.toUpperCase()))) as any
}

function cNS(namespace: string, children: CNodeChildren): CNode {
  return children
    ? c(
        children?.map((child) => {
          if (!child || typeof child === 'string')
            return child
          if (typeof child === 'function') {
            return (option: CRenderOption) => {
              return cNS(namespace, [child(option)])
            }
          }
          if (Array.isArray(child))
            return cNS(namespace, child)
          if ((child as any)._marked) {
            return child
          }
          ;(child as any)._marked = true
          if (!child.$) {
            return cNS(namespace, child.children)
          }
          else if (typeof child.$ === 'string') {
            if (child.$[0] !== '@') {
              child.$ = `${namespace} ${child.$}`
            }
          }
          else if (typeof child.$ === 'object') {
            if (!child.$.$) {
              return cNS(namespace, child.children)
            }
            else if (typeof child.$.$ === 'string') {
              if (child.$.$[0] !== '@')
                child.$.$ = `${namespace} ${child.$.$}`
            }
            else {
              const $_ = child.$.$
              child.$.$ = (option: CRenderOption) => {
                let $ = $_(option)
                if ($ && $[0] !== '@') {
                  $ = `${namespace} ${$}`
                }
                return $
              }
            }
          }
          else {
            const $_ = child.$
            child.$ = (option: CRenderOption) => {
              let $ = $_(option)
              if ($ && $[0] !== '@') {
                $ = `${namespace} ${$}`
              }
              return $
            }
          }
          return child
        })
      )
    : c([])
}

export {
  asModal,
  c,
  cB,
  cCB,
  cE,
  cM,
  cNotM,
  cNS,
  createKey,
  find,
  insideModal,
  insidePopover,
  namespace,
  prefix
}
