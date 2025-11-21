<markdown>
# 表单边框

表单边框可以单独使用。
</markdown>

<script lang="ts" setup>
import type { FormBorderInst } from '../../src/interface'
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { ref } from 'vue'

const formBorderRef = ref<FormBorderInst | null>(null)
function onInputBlur() {
  formBorderRef.value?.blur()
}
</script>

<template>
  <n-space>
    <n-form-border>
      <div status="error" style="padding: 9px 10px; line-height: 1">
        <n-icon><CashIcon /></n-icon>
      </div>
    </n-form-border>
    <n-form-border ref="formBorderRef">
      <n-input :bordered="false" @blur="onInputBlur" />
    </n-form-border>
  </n-space>
</template>
