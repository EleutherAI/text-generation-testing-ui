import React from "react"

export default function IconXClose(props) {
  const { fill } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      role="img"
      class="iconify iconify--clarity"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 36 36"
      {...props}>
      <path
        class="clr-i-outline clr-i-outline-path-1"
        d="M19.41 18l8.29-8.29a1 1 0 0 0-1.41-1.41L18 16.59l-8.29-8.3a1 1 0 0 0-1.42 1.42l8.3 8.29l-8.3 8.29A1 1 0 1 0 9.7 27.7l8.3-8.29l8.29 8.29a1 1 0 0 0 1.41-1.41z"
        fill={fill || "#34566f"}></path>
    </svg>
  )
}
