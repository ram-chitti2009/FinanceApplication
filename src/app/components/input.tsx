import { forwardRef, ForwardedRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { type = "text", className, ...rest } = props;
    
    const styles: Record<string, string> = {
        "checkbox": "rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:focus:ring-blue-500 dark:focus:ring-offset-gray-800 disabled:opacity-75",
        "default": "w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950",
    }
    
    return (
        <input
            {...rest}
            type={type}
            className={`${styles[type] ?? styles["default"]} ${className ?? ""}`}
            ref={ref}
        />
    );
});

Input.displayName = 'Input';

export default Input;
