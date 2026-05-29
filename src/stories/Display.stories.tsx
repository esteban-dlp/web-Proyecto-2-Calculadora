import type { Meta, StoryObj } from '@storybook/react'
import { Display } from '../components/Display'

const meta: Meta<typeof Display> = {
  title: 'Components/Display',
  component: Display
}
export default meta

type Story = StoryObj<typeof Display>

export const Initial: Story = { args: { value: '0' } }
export const Number: Story = { args: { value: '12345' } }
export const Decimal: Story = { args: { value: '3.14159' } }
export const MaxLength: Story = { args: { value: '999999999' } }
export const Error: Story = { args: { value: 'ERROR' } }
