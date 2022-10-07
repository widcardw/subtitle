import { useStorage } from '@vueuse/core'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import ToggleDark from '~/components/ToggleDark'
import UInput from '~/components/UInput'

export default defineComponent({
  setup() {
    const router = useRouter()
    const lang = useStorage('r-lang', 'zh-CN')
    const height = useStorage('r-height', '3')
    const shadowColor = useStorage('r-shadow-color', '')
    const textColor = useStorage('r-text-color', '#000000')
    const colorRef = ref<HTMLInputElement>()
    const colorRef2 = ref<HTMLInputElement>()
    const go = () => {
      if (lang.value.trim())
        router.push(`/recognize?lang=${encodeURIComponent(lang.value)}&height=${height.value}&textColor=${encodeURIComponent(textColor.value)}&shadowColor=${encodeURIComponent(shadowColor.value)}`)
    }

    return () => (
      <>
        <div text="center" p="x-4 y-10">
          <div>
            <UInput
              label="Language"
              placeholder="zh-CN / en-US / ja / ..."
              v-model:modelValue={lang.value}
              disabled={false}
            />
          </div>
          <div>
            <UInput
              label="Height"
              v-model:modelValue={height.value}
              disabled={false}
            />
          </div>
          <div>
            <UInput
              label="Text color"
              v-model:modelValue={textColor.value}
              disabled={false}
              {...{ onClick: () => { colorRef2.value?.click() } }}
            />
            <input
              ref={colorRef2}
              v-model={textColor.value}
              type="color"
              class={['w-0 h-0', 'absolute', 'op-0']}
            />
          </div>
          <div>
            <UInput
              label="Background color"
              v-model:modelValue={shadowColor.value}
              disabled={false}
              {...{ onClick: () => { colorRef.value?.click() } }}
            />
            <input
              ref={colorRef}
              v-model={shadowColor.value}
              type="color"
              class={['w-0 h-0', 'absolute', 'op-0']}
            />
          </div>
          <div>
            <button
              btn m-3 text-sm
              disabled={lang.value.trim() === ''}
              onClick={() => go()}
            >
              Go
            </button>
          </div>
          <ToggleDark />
        </div>
      </>
    )
  },
})
