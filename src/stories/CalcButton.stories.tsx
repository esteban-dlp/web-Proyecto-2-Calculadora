import type { Meta, StoryObj } from '@storybook/react'
import { CalcButton } from '../components/CalcButton'

const meta: Meta<typeof CalcButton> = {
  title: 'Components/CalcButton',
  component: CalcButton,
  args: { onClick: () => {} }
}
export default meta

type Story = StoryObj<typeof CalcButton>

export const Digit: Story = { args: { label: '5', variant: 'digit' } }
export const Operator: Story = { args: { label: '+', variant: 'operator' } }
export const Equals: Story = { args: { label: '=', variant: 'equals' } }
export const Function: Story = { args: { label: 'C', variant: 'function' } }
