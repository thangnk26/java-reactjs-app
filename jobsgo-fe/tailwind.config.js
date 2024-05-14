/** @type {import('tailwindcss').Config} */
module.exports = {
    // mode: 'jit',
    // purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                manrope: ['Manrope', 'sans-serif'],
            },
            boxShadow: {
                ssm: '0 1px 12px 0 rgb(0 0 0 / 15%);',
            },
        },
    },
    plugins: [],
};
