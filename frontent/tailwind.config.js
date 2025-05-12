import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}", // Merged content paths
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'pulse-soft': {
          '0%, 100%': {
            opacity: '1'
          },
          '50%': {
            opacity: '0.8'
          }
        },
        'width-expand': {
          '0%': {
            width: '0%'
          },
          '100%': {
            width: '100%'
          }
        },
        'scale-up': {
          '0%': {
            transform: 'scale(0.95)',
            opacity: '0.5'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'width-expand': 'width-expand 1.5s ease-out',
        'scale-up': 'scale-up 0.4s ease-out'
      },
      fontFamily: {
        roboto: ['"Roboto"', 'sans-serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        dancing: ['"Dancing Script"', 'cursive'],
        poppins: ['"Poppins"', 'sans-serif'],
        lobster: ['"Lobster"', 'cursive'],
        ubuntu: ['"Ubuntu"', 'sans-serif'],
        oswald: ['"Oswald"', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'cursive'],
        anton: ['"Anton"', 'sans-serif'],
        alfa: ['"Alfa Slab One"', 'serif'],
        blackHan: ['"Black Han Sans"', 'sans-serif'],
        kanit: ['"Kanit"', 'sans-serif'],
        luckiest: ['"Luckiest Guy"', 'cursive'],
        ultra: ['"Ultra"', 'serif'],
        bungee: ['"Bungee"', 'cursive'],
        bigShoulders: ['"Big Shoulders Display"', 'sans-serif'],
        openSans: ['"Open Sans"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
        raleway: ['"Raleway"', 'sans-serif'],
        nunito: ['"Nunito"', 'sans-serif'],
        robotoCondensed: ['"Roboto Condensed"', 'sans-serif'],
        robotoMono: ['"Roboto Mono"', 'monospace'],
        sourceCodePro: ['"Source Code Pro"', 'monospace'],
        firaCode: ['"Fira Code"', 'monospace'],
        spaceGrotesk: ['"Space Grotesk"', 'sans-serif'],
        lora: ['"Lora"', 'serif'],
        merriweather: ['"Merriweather"', 'serif'],
        montserratAlternates: ['"Montserrat Alternates"', 'sans-serif'],
        poppinsAlternates: ['"Poppins Alternates"', 'sans-serif'],
        robotoSlab: ['"Roboto Slab"', 'serif'],
        robotoThin: ['"Roboto Thin"', 'sans-serif'],
        robotoLight: ['"Roboto Light"', 'sans-serif'],
        robotoMedium: ['"Roboto Medium"', 'sans-serif'],
        robotoBold: ['"Roboto Bold"', 'sans-serif'],
        robotoBlack: ['"Roboto Black"', 'sans-serif'],
        robotoThinItalic: ['"Roboto Thin Italic"', 'sans-serif'],
        robotoLightItalic: ['"Roboto Light Italic"', 'sans-serif'],
        robotoMediumItalic: ['"Roboto Medium Italic"', 'sans-serif'],
        robotoBoldItalic: ['"Roboto Bold Italic"', 'sans-serif'],
        robotoBlackItalic: ['"Roboto Black Italic"', 'sans-serif'],
        robotoThinCondensed: ['"Roboto Thin Condensed"', 'sans-serif'],
        robotoLightCondensed: ['"Roboto Light Condensed"', 'sans-serif'],
        robotoMediumCondensed: ['"Roboto Medium Condensed"', 'sans-serif'],
        robotoBoldCondensed: ['"Roboto Bold Condensed"', 'sans-serif'],
        robotoBlackCondensed: ['"Roboto Black Condensed"', 'sans-serif'],
        robotoThinCondensedItalic: ['"Roboto Thin Condensed Italic"', 'sans-serif'],
        robotoLightCondensedItalic: ['"Roboto Light Condensed Italic"', 'sans-serif'],
        robotoMediumCondensedItalic: ['"Roboto Medium Condensed Italic"', 'sans-serif'],
        robotoBoldCondensedItalic: ['"Roboto Bold Condensed Italic"', 'sans-serif'],
        robotoBlackCondensedItalic: ['"Roboto Black Condensed Italic"', 'sans-serif'],
        robotoThinItalicCondensed: ['"Roboto Thin Italic Condensed"', 'sans-serif'],
        robotoLightItalicCondensed: ['"Roboto Light Italic Condensed"', 'sans-serif'],
        pacifico: ['"Pacifico"', 'cursive'],
        abril: ['"Abril Fatface"', 'serif'],
        playfairDisplay: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Merged plugins
} satisfies Config;