import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

    :root {
        /* Colors */
        --transparent: rgba(0, 0, 0, 0);
        
        /* Containers */
        --globalContainer: 1100px;
        --globalPaddingLr: 30px;
        --globalPaddingTb: 60px;

        /* Radius */
        --defaultRadius: 10px;

        /* Gaps */
        --gapSmall: 10px; // .625rem
        --gapRegular: 20px; // 1.25rem
        --gapL: 30px;
        --gapXL: 60px; // 3.75rem

        /* Typography */
        --defaultStack: -apple-system, BlinkMacSystemFont, "Helvetica", "Helvetica Neue", "Arial", sans-serif;

        --headingXXL: 3.25rem; // 52px
        --headingXL: 2.625rem; // 42px
        --headingL: 2rem; // 32px
        --headingM: 1.625rem; // 26px
        --headingS: 1.375rem; // 24px
        --baseXL: 1.25rem; // 20px
        --baseL: 1.125rem; // 18px
        --baseM: 1rem; // 16px
        --baseS: .815rem; // 14px

        --baseMMobile: calc(var(--baseM) * 1.1);
        --baseSMobile: calc(var(--baseS) * 1.1);

        --headingsHeight: 1.1;
        --paragraphHeight: 1.5;
    }

    *, *::before, *::after {
        box-sizing: border-box;
    }

    html {
        font-size: 16px;
        margin: 0;
        padding: 0;
        line-height: var(--paragraphHeight);
        background: var(--background);
    }

    .lightTheme {
        --primaryColor: #0067FA;
        --primaryDarker: #165BBB;
        --primaryBrighter: #EBF6FF;
        --headingsColor: #4D4D4D;
        --baseTextColor:#6E7581;
        --articleTextColor: #4D4D4D;
        --disabledColor: #6e7581;
        --dividerColor: #e2e2e2;
        --markBackgroundColor: #FDFFB4;
        --markTextColor: #4D4D4D;
        --backgroundAlt: #FFFFFF;
        --background: #FFFFFF;
    }

    .darkTheme {
        --primaryColor: #5995ea;
        --primaryDarker: #165BBB;
        --primaryBrighter: #3a4957;
        --headingsColor: #eee;
        --baseTextColor: #aaa;
        --articleTextColor: #c4c4c4;
        --disabledColor: #E2E2E2;
        --dividerColor: #242a31;
        --markBackgroundColor: #b2dbff;
        --markTextColor: #181b22;
        --background: #181b22;
        --backgroundAlt: #1d2028;
    }

    body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: var(--defaultStack);
        font-weight: 500;
        color: var(--baseTextColor);
        margin: 0;
        padding: 0;
    }

    h1, h2, h3, p {
        margin: 0;
        padding: 0;
    }

    ul, ol {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    button {
        cursor: pointer;
        margin: 0;
        padding: 0;
        appearance: none;
        border: none;
        background: none;
    }

    button,
    input,
    select,
    textarea {
        font-family: inherit; /* 1 */
        font-size: 100%; /* 1 */
        line-height: 1.15; /* 1 */
        margin: 0; /* 2 */
    }

    a { 
        text-decoration: none;
        background-color: transparent;
    }

    b, strong {
        font-weight: 700;
    }

    address, time {
        font-style: normal;
    }

    /* Classes */
    .activeClassLink {
        color: var(--primaryColor) !important;
        cursor: default;
    }
    
    .classicButton {
        background: var(--primaryColor);
        color: white;
        transition: background .2s ease-in-out;
        border-radius: 10px;
        white-space: nowrap;
        font-weight: 700;
        font-family: var(--defaultStack);
        font-size: var(--baseM);
        display: flex;
        align-items: center;
        justify-content: center;
        width: min-content;
        height: min-content;
        padding: .6em 1em;

        &:hover {
            background: var(--primaryDark);
        }

        @media screen and (max-width: 768px) {
            font-size: var(--baseMMobile);
        }
    }

    .classicButtonOutline {
        border: 2px solid var(--primaryColor);
        background: transparent;
        color: var(--primaryColor);
        padding: .4em 1em;
        transition: background .2s ease-in-out, color .2s ease-in-out;

        &:hover {
            background: var(--primaryColor);
            color: white;
        }
    }
    `;

export default GlobalStyles;
