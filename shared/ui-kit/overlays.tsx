'use client'

import * as UI from '@heroui/react'
import { ReactNode, useState } from 'react'
import { ButtonRoot, ButtonProps, Color } from './components'
import { withStyles } from './styles'

export const Tooltip = withStyles(
    ({
        content,
        children,
        placement,
        hideArrow,
        className,
        ...props
    }: UI.TooltipProps & {
        content?: ReactNode
        placement?: UI.TooltipContentProps['placement'] | 'topStart' | 'topEnd'
        hideArrow?: boolean
        className?: string
    }) => (
        <UI.Tooltip {...props}>
            <UI.Tooltip.Trigger className="inline-flex">{children}</UI.Tooltip.Trigger>
            <UI.Tooltip.Content
                className={className}
                placement={
                    placement === 'topStart'
                        ? 'top start'
                        : placement === 'topEnd'
                          ? 'top end'
                          : placement
                }
            >
                {!hideArrow && <UI.Tooltip.Arrow />}
                {content}
            </UI.Tooltip.Content>
        </UI.Tooltip>
    )
)

type ModalProps = Omit<UI.ModalDialogProps, 'children' | 'onClose'> & {
    children: ReactNode
    open?: boolean
    closeButton?: boolean
    preventClose?: boolean
    blur?: boolean
    onClose?: () => void
}
const ModalRoot = ({
    children,
    open,
    closeButton,
    preventClose,
    blur,
    onClose,
    ...props
}: ModalProps) => (
    <UI.Modal.Backdrop
        isOpen={open}
        onOpenChange={(value) => {
            if (!value) onClose?.()
        }}
        isDismissable={!preventClose}
        variant={blur ? 'blur' : 'opaque'}
    >
        <UI.Modal.Container size="md" placement="center">
            <UI.Modal.Dialog {...props}>
                {closeButton && <UI.Modal.CloseTrigger aria-label="Закрыть" />}
                {children}
            </UI.Modal.Dialog>
        </UI.Modal.Container>
    </UI.Modal.Backdrop>
)
export const Modal = Object.assign(ModalRoot, {
    Header: withStyles(UI.Modal.Header),
    Body: withStyles(UI.Modal.Body),
    Footer: withStyles(UI.Modal.Footer),
    Heading: UI.Modal.Heading,
})
export function useModal() {
    const [visible, setVisible] = useState(false)
    return { visible, setVisible, bindings: { onClose: () => setVisible(false) } }
}

function DropdownMenu<T extends object>({
    color,
    placement = 'bottom end',
    ...props
}: UI.DropdownMenuProps<T> & { color?: Color; placement?: UI.DropdownPopoverProps['placement'] }) {
    return (
        <UI.Dropdown.Popover placement={placement}>
            <UI.Dropdown.Menu {...props} />
        </UI.Dropdown.Popover>
    )
}
const DropdownRoot = (props: UI.DropdownProps) => <UI.Dropdown {...props} />
export const Dropdown = Object.assign(DropdownRoot, {
    Trigger: UI.Dropdown.Trigger,
    Button: withStyles((props: ButtonProps) => <ButtonRoot {...props} slot="trigger" />),
    Menu: DropdownMenu,
    Item: UI.Dropdown.Item,
})
