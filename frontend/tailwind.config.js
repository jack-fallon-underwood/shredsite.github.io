// tailwind.config.js

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Adjust paths to match your project structure
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'move-to-bottom': { // Renamed for clarity
          '0%': {
            // Assuming your element starts centered.
            // You might need to adjust these based on your initial centering method.
            // If using `absolute` or `flex` for initial centering,
            // you'll need to override those with `fixed` and `top/left/transform`
            // in your component's classes.
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // Center it initially
          },
          '100%': {
            top: 'auto', // Remove top constraint
            bottom: '10px', // Pin to the bottom
            
            transform: 'translateX(-35%)', // Adjust for horizontal centering
          },
        },
      },
      animation: {
        'move-to-bottom': 'move-to-bottom 0.7s forwards', // Renamed animation
      },
    },
  },
  plugins: [],
};