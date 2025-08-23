﻿export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            keyframes: {
                'slide-down': {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                'slide-down': 'slide-down 0.3s ease-out',
            },
        },
    },
    plugins: [], // ❌ removed line-clamp (included by default in Tailwind v3.3+)
};
