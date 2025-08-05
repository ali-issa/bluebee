import React, { forwardRef, HTMLAttributes } from 'react'

const Marquee = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={className}>
        <div className="flex overflow-hidden md:gap-1 gap-8 relative select-none" {...props}>
          <div className="scroll shrink-0 flex items-center justify-around min-w-full md:gap-1 gap-8">
            {children}
          </div>
          <div className="scroll shrink-0 flex items-center justify-around min-w-full md:gap-1 gap-8">
            {children}
          </div>
        </div>
      </div>
    )
  },
)

Marquee.displayName = 'Marquee'

export default Marquee
