/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-container-highest": "#e2e1ee",
        "on-secondary-fixed": "#00210c",
        "inverse-surface": "#2e3039",
        "tertiary-fixed": "#d8e3fb",
        "secondary-fixed-dim": "#4de082",
        "primary-fixed": "#dde1ff",
        "surface-container-low": "#f3f2ff",
        "on-secondary-container": "#007439",
        "inverse-primary": "#b8c4ff",
        "on-surface": "#191b24",
        "on-tertiary-fixed": "#111c2d",
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "inverse-on-surface": "#f0effc",
        "on-error-container": "#93000a",
        "outline-variant": "#c4c5d8",
        "on-surface-variant": "#434655",
        "on-tertiary": "#ffffff",
        "secondary-container": "#6dfe9c",
        "error-container": "#ffdad6",
        "on-tertiary-container": "#e0e9ff",
        "surface-container-lowest": "#ffffff",
        "primary-container": "#2d5aee",
        "surface-tint": "#1c4ee3",
        "surface-dim": "#d9d9e5",
        "secondary-fixed": "#6dfe9c",
        "surface": "#fbf8ff",
        "on-primary-container": "#e6e8ff",
        "on-primary-fixed": "#001453",
        "on-secondary": "#ffffff",
        "primary-fixed-dim": "#b8c4ff",
        "surface-variant": "#e2e1ee",
        "primary": "#003fd0",
        "tertiary-fixed-dim": "#bcc7de",
        "on-background": "#191b24",
        "surface-bright": "#fbf8ff",
        "tertiary-container": "#5e697e",
        "on-secondary-fixed-variant": "#005227",
        "surface-container-high": "#e8e7f3",
        "on-primary-fixed-variant": "#0037b9",
        "tertiary": "#465165",
        "on-tertiary-fixed-variant": "#3c475a",
        "outline": "#747687",
        "on-primary": "#ffffff",
        "surface-container": "#ededf9",
        "secondary": "#006d36",
        "background": "#fbf8ff"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        "gutter": "24px",
        "container-max": "1200px",
        "unit": "8px",
        "margin-desktop": "40px",
        "stack-md": "24px",
        "margin-mobile": "16px",
        "stack-sm": "8px",
        "stack-lg": "48px"
      },
      fontFamily: {
        "label-sm": ["Inter"],
        "h3": ["Manrope"],
        "body-lg": ["Inter"],
        "chat-text": ["Inter"],
        "body-md": ["Inter"],
        "h1": ["Manrope"],
        "h2": ["Manrope"]
      },
      fontSize: {
        "label-sm": ["14px", { lineHeight: "1", letterSpacing: "0.02em", fontWeight: "500" }],
        "h3": ["24px", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" }],
        "chat-text": ["15px", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" }],
        "h1": ["40px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "h2": ["32px", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }]
      }
    }
  },
  plugins: []
}