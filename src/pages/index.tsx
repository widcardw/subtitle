import { useStorage } from '@vueuse/core'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import ToggleDark from '~/components/ToggleDark'

export default defineComponent({
  setup() {
    const router = useRouter()
    const lang = useStorage('r-lang', 'zh-CN')
    const height = useStorage('r-height', 3)
    const go = () => {
      if (lang.value.trim())
        router.push(`/recognize?lang=${encodeURIComponent(lang.value)}&height=${height.value}`)
    }

    return () => (
      <>
        <div text="center" p="x-4 y-10">
          <div>
            <input
              v-model={lang.value}
              placeholder="zh-CN / en-US / ja / ..."
              type="text"
              autocomplete="false"
              class="iput"
          />
          </div>
          <div>
            <input
              v-model={height.value}
              placeholder="Height"
              type="number"
              class={['iput']}
              max="50"
              min="1"
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
