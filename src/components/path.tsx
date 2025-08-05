import * as motion from 'motion/react-client'
import { Icons } from './svg'

const transition = { duration: 4, yoyo: Infinity, ease: 'easeInOut' }

export default function MotionPath() {
  return (
    <div className="absolute z-50 scale-[40%] md:scale-60 lg:scale-90 xl:scale-100 h-[240px] -mt-[320px] md:-mt-[400px] -right-24 md:right-2 lg:right-48">
      <svg
        viewBox="0 0 398.011 226.558"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M.546 226.012s75.862-12.346 86.03-61.149c10.169-48.804-49.431-33.638-16.675 9.118 32.757 42.757 110.613 21.62 133.535 12.376 22.922-9.243 46.672-24.443 69.136-60.019 22.465-35.577 17.057-112.635-20.83-123.618-37.888-10.983-60.437 20.952-61.555 45.454-1.118 24.503 19.442 65.887 63.75 73.59 44.307 7.704 102.798 3.3 143.53-71.457"
          stroke="hsl(var(--background))"
          strokeWidth="2"
          fillRule="evenodd"
          strokeDasharray="4.363,5.817"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="transparent"
          initial={{ pathLength: 0.001, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={transition}
        />
      </svg>
      <motion.div
        className="absolute text-background -top-7 left-3"
        style={box}
        initial={{ offsetDistance: '0%', opacity: 0, scale: 2.5 }}
        animate={{ offsetDistance: '100%', opacity: 1, scale: 1 }}
        transition={transition}
      >
        <Icons.coloredBeeInverted className="w-12 h-auto" />
      </motion.div>
    </div>
  )
}

const box: React.CSSProperties = {
  offsetPath: `path("M.546 226.012s75.862-12.346 86.03-61.149c10.169-48.804-49.431-33.638-16.675 9.118 32.757 42.757 110.613 21.62 133.535 12.376 22.922-9.243 46.672-24.443 69.136-60.019 22.465-35.577 17.057-112.635-20.83-123.618-37.888-10.983-60.437 20.952-61.555 45.454-1.118 24.503 19.442 65.887 63.75 73.59 44.307 7.704 102.798 3.3 143.53-71.457")`,
}
