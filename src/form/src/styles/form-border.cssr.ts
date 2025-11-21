import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-color
// --n-border-radius
// --n-border
// --n-border-disabled
// --n-border-hover
// --n-border-focus
// --n-color-disabled
// --n-color-focus
// --n-box-shadow-focus
// ...form item vars
export default cB('form-border', `
  max-width: 100%;
  cursor: text;
  line-height: 1.5;
  z-index: auto;
  outline: none;
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  border-radius: var(--n-border-radius);
  background-color: var(--n-color);
  transition: background-color .3s var(--n-bezier);
`, [
  cM('disabled', `
    cursor: not-allowed;
    background-color: var(--n-color-disabled);
  `, [
    cE('border', 'border: var(--n-border-disabled);'),
  ]),
  cNotM('disabled', [
    c('&:hover', [
      cE('state-border', 'border: var(--n-border-hover);')
    ]),
    cM('focus', 'background-color: var(--n-color-focus);', [
      cE('state-border', `
        border: var(--n-border-focus);
        box-shadow: var(--n-box-shadow-focus);
      `)
    ])
  ]),
  cE('border, state-border', `
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    border-radius: inherit;
    border: var(--n-border);
    transition:
      box-shadow .3s var(--n-bezier),
      border-color .3s var(--n-bezier);
  `),
  cE('state-border', `
    border-color: #0000;
    z-index: 1;
  `),
  ['warning', 'error'].map(status => cM(`${status}-status`, [
    cNotM('disabled', [
      cE('state-border', `
        border: var(--n-border-${status});
      `),
      c('&:hover', [
        cE('state-border', `
          border: var(--n-border-hover-${status});
        `)
      ]),
      c('&:focus', `
        background-color: var(--n-color-focus-${status});
      `, [
        cE('state-border', `
          box-shadow: var(--n-box-shadow-focus-${status});
          border: var(--n-border-focus-${status});
        `)
      ]),
      cM('focus', `
        background-color: var(--n-color-focus-${status});
      `, [
        cE('state-border', `
          box-shadow: var(--n-box-shadow-focus-${status});
          border: var(--n-border-focus-${status});
        `)
      ])
    ])
  ]))
])
