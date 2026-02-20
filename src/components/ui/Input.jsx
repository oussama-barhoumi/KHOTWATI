import { forwardRef } from 'react';

export const Input = forwardRef(
    ({ label, error, icon, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-[#2d2d2d] dark:text-[#ebe4d9] mb-2">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF6600] opacity-70">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`
              w-full rounded-[20px] border transition-all duration-200
              bg-white/80 dark:bg-white/5
              border-[#ebe4d9] dark:border-white/10
              px-4 py-3 text-[#2d2d2d] dark:text-beige-100
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-[#FF6600]/50 focus:border-[#FF6600]
              ${icon ? 'pl-12' : ''}
              ${error ? 'border-red-500 focus:ring-red-500/50' : ''}
              ${className}
            `}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
