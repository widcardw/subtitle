import { defineComponent, onBeforeMount, onMounted } from 'vue'
import { useSpeechRecognition } from '@vueuse/core'
import './Speech.css'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    lang: String,
    height: Number,
  },
  setup(props) {
    const { isListening, isSupported, result, start, stop, error } = useSpeechRecognition({
      lang: props.lang,
      continuous: true,
    })

    onMounted(() => {
      if (isSupported.value)
        start()
    })

    const router = useRouter()

    router.beforeEach((to, from, next) => {
      if (from.name === 'recognize')
        stop()

      next()
    })

    onBeforeMount(stop)
    return () => (
      <>
        <div
          class={['flex-(~ col)', 'm-2']}
        >
          <div
            icon-btn
            class={{
              'text-gray': !isListening.value,
              'mb-2': true,
            }}
            onClick={() => { isListening.value ? stop() : start() }}
              >
            {isListening.value ? 'Listening...' : 'Paused'}
          </div>
          <div>
            {error.value}
          </div>
          <div
            style={{
              height: `${props.height || 3}rem`,
            }}
            class={[
              'of-y-scroll',
              'scroller',
            ]}
        >
            <div class="flex-1">
              {result.value}
            </div>
          </div>
        </div>
      </>
    )
  },
})
