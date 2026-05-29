import type { Meta, StoryObj } from '@storybook/react'
import { Keyboard } from '../components/Keyboard'

const meta: Meta<typeof Keyboard> = {
  title: 'Components/Keyboard',
  component: Keyboard,
  args: {
    onDigit: () => {},
    onOperator: () => {},
    onEquals: () => {},
    onToggleSign: () => {},
    onClear: () => {}
  }
}
export default meta

type Story = StoryObj<typeof Keyboard>

export const Default: Story = {}
