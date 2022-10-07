import { useFocus, useVModel } from '@vueuse/core'
import { computed, defineComponent, ref, withModifiers } from 'vue'

export default defineComponent({
  props: {
    label: String,
    modelValue: String,
    disabled: Boolean,
    placeholder: String,
  },
  setup(props, { emit }) {
    const value = useVModel(props, 'modelValue', emit)
    const inputRef = ref<HTMLInputElement>()

    const { focused } = useFocus(inputRef)
    const shouldFloat = computed(() => focused.value || value.value !== '')
    const computedStyle = computed(() => (
      shouldFloat.value ? 'scale-80 translate-x-0 translate-y--12 op-100' : 'translate-y--29px op-50'),
    )
    return () => (
      <div
        class={[
          'inline-block',
          'm-(x-2 y-2)',
        ]}
        onClick={withModifiers(() => emit('click'), ['self'])}
        >
        <input
          ref={inputRef}
          type="text"
          v-model={value.value}
          disabled={props.disabled}
          placeholder={shouldFloat.value ? props.placeholder : ''}
          class={[
            'border-none',
            '!outline-none',
            'text-gray-700 dark:text-gray-200 text-1rem',
            'disabled:op-40',
            'bg-transparent',
            'm-0 p-0',
            'leading-loose',
          ]}
          />
        <div
          class={['border-b-1px border-gray-200 dark:border-gray-700']}
          />
        <div
          class={{
            'border-(b-2px teal-600)': true,
            'scale-x-0': !focused.value,
            'transition-all duration-400': true,
          }}
          />
        <div
          class={[
            'transition-all duration-400 absolute select-none',
            'transform-origin-lt',
            focused.value ? 'text-teal-600 op-100' : 'op-80',
            computedStyle.value,
          ]}
          onClick={() => inputRef.value?.focus()}
          >
          {props.label}
        </div>
      </div>
    )
  },
})
