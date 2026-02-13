import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import { cn } from '../../lib/utils'

export const stackVariants = cva('flex', {
	variants: {
		orientation: {
			horizontal: 'flex-row',
			vertical: 'flex-col',
		},
	},
	defaultVariants: {
		orientation: 'vertical',
	},
})

export function Stack({
	className,
	orientation = 'vertical',
	asChild = false,
	...props
}: React.ComponentProps<'div'> &
	VariantProps<typeof stackVariants> & {
		asChild?: boolean
	}) {
	const Comp = asChild ? Slot.Root : 'div'
	return (
		<Comp
			data-slot="stack"
			data-orientation={orientation}
			className={cn(stackVariants({ orientation, className }))}
			{...props}
		/>
	)
}
