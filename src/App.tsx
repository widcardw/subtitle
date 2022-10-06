import { defineComponent } from 'vue'
import './App.css'
import { RouterView } from 'vue-router'

export default defineComponent({
  setup() {
    return () => (
      <>
        {/**
           * @unocss/transformer-variant-group
           * automatically transform variant group classes
           */}
        <main
          class={[
            'text-gray-700 dark:text-gray-200',
            'font-sans',
          ]}
        >
          <RouterView />
        </main>
      </>
    )
  },
})
