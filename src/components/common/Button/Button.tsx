export enum ButtonTypesEnum {
    BUTTON = 'button',
    SUBMIT = 'submit',
    RESET = 'reset',
}

interface ButtonProps {
    children: React.ReactNode
    type?: ButtonTypesEnum
    justify?: 'flex-start' | 'center' | 'flex-end'
    className?: string
    disabled?: boolean
    onClick?: (e?: any) => void
}

const Button = ({
    children,
    type = ButtonTypesEnum.BUTTON,
    justify = 'center',
    className,
    disabled,
    onClick,
}: ButtonProps) => {
    const getButtonStyle = () => {
        return {
            active: 'border border-primary focus:outline-primary-light text-primary hover:bg-gray-800 focus:outline focus:outline-2 focus:outline-offset-2 lg:min-w-[180px]',
            disabled:
                'border border-gray-900 bg-gray-900 text-gray-600 lg:min-w-[180px]',
        }
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={`inline-flex items-center justify-${justify} rounded font-medium ${
                disabled ? getButtonStyle().disabled : getButtonStyle().active
            } text-md px-4 py-2 ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
export default Button
