import { useUrlSearchParams } from '@vueuse/core'
import { defineComponent } from 'vue'
import Speech from '~/components/Speech'

export default defineComponent({
  setup() {
    const params = useUrlSearchParams('history')

    const parseHeight = (i: string | string[] | undefined) => {
      if (typeof i === 'string') {
        const n = Number(i)
        if (n > 0)
          return n
        else
          return 3
      }
      else {
        return 3
      }
    }
    return () => (
      <>
        {params.lang
          ? (typeof params.lang === 'string'
              ? <Speech lang={params.lang} height={parseHeight(params.height)} />
              : '')
          : 'No language specified!'}
      </>
    )
  },
})
