import React from "react"
import PropTypes from "prop-types"

const buttonVariants = {
  default: "bg-github-accent hover:bg-github-accent/90 text-white",
  outline: "border border-github-border bg-transparent hover:bg-github-navHighlight text-github-fg",
  ghost: "bg-transparent hover:bg-github-navHighlight text-github-fg",
  link: "bg-transparent underline-offset-4 hover:underline text-github-fg",
}

const buttonSizes = {
  default: "h-9 px-4 py-2",
  sm: "h-8 px-3 text-sm",
  lg: "h-10 px-8",
  icon: "h-9 w-9 p-2",
}

export const Button = React.forwardRef(
  ({ className = "", variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? React.cloneElement(children, { ref, ...props }) : "button"

    const variantClass = buttonVariants[variant] || buttonVariants.default
    const sizeClass = buttonSizes[size] || buttonSizes.default

    const classes = `inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-github-accent disabled:pointer-events-none disabled:opacity-50 ${variantClass} ${sizeClass} ${className}`

    if (asChild) {
      return React.cloneElement(children, {
        ref,
        className: classes,
        ...props,
      })
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "outline", "ghost", "link"]),
  size: PropTypes.oneOf(["default", "sm", "lg", "icon"]),
  asChild: PropTypes.bool,
  children: PropTypes.node,
}

