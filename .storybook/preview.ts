import type { Preview } from '@storybook/react'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0d0d14' },
        { name: 'light', value: '#f5f5f5' }
      ]
    }
  }
}

export default preview
