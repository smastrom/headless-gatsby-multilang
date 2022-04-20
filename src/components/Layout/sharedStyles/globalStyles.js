import { createGlobalStyle } from 'styled-components';

import { easeOutTiming } from './animationStyles';

export const GlobalStyle = createGlobalStyle`
    :root {
        --globalContainer: 1100px;
        --articleContainer: 700px;
        --globalPaddingLr: 1.875rem; /* 30px */
        --globalPaddingTb: 3.75rem; /* 60px */
        --defaultRadius: 0.625rem; /* 10px */
        --gapSmall: 0.625rem; /* 10px */
        --gapRegular: 1.25rem; /* 20px */
        --gapL: 1.875rem; /* 30px */
        --gapXL: 3.75rem; /* 60px */
        --borderRegular: 2px;
        --borderSmall: 1px;
        --defaultStack: -apple-system, BlinkMacSystemFont, "Helvetica", "Helvetica Neue", "Arial", sans-serif;
        --defaultCodeStack: ui-monospace, "Cascadia Mono", "Segoe UI Mono", "Ubuntu Mono", "Roboto Mono", Menlo, Monaco, Consolas, monospace;
        --headingXXL: 3.25rem; /* 52px */
        --headingXL: 2.625rem;  /* 42px */
        --headingL: 2rem; /* 32px */
        --headingM: 1.625rem; /* 26px */
        --headingS: 1.375rem; /* 24px */
        --baseXL: 1.25rem; /* 20px */
        --baseL: 1.125rem; /* 18px */
        --baseM: 1rem; /* 16px */
        --baseS: .815rem; /* 14px */
        --baseMMobile: calc(var(--baseM) * 1.1);
        --baseSMobile: calc(var(--baseS) * 1.1);
        --headingsLineHeight: 1.1;
        --bodyLineHeight: 1.5;
    }

    *, *::before, *::after {
        box-sizing: border-box;
    }

    html {
        font-size: 100%;
        font-family: var(--defaultStack);
        margin: 0;
        padding: 0;
        line-height: var(--bodyLineHeight);
        background: var(--backgroundColor);
    }

    [dir=rtl] {
      font-size: 110%;
    }

    .lightTheme {
        --primaryColor: #0067FA;
        --headingsColor: #4D4D4D;
        --baseTextColor:#6E7581;
        --dividerColor: #E2E2E2;
        --markBackgroundColor: #FDFFB4;
        --markTextColor: #4D4D4D;
        --inlineCodeTextColor: #4D4D4D;
        --inlineCodeBackgroundColor: #DBEFFF;
        --backgroundColor: #FFFFFF;
        --backgroundTransparentColor: rgba(255, 255, 255, 0);
        --backgroundColorAlt: #FFFFFF;
        --codeBlockBackgroundColor: #181B22;
    }

    .darkTheme {
        --primaryColor: #5995EA;
        --headingsColor: #EEEEEE;
        --baseTextColor: #AAAAAA;
        --dividerColor: #242A31;
        --markBackgroundColor: #B2DBFF;
        --markTextColor: #181B22;
        --inlineCodeTextColor: #FFFFFF;
        --inlineCodeBackgroundColor: #293B4A;
        --backgroundColor: #181B22;
        --backgroundTransparentColor: rgba(24, 27, 34, 0);
        --backgroundColorAlt: #1D2028;
        --codeBlockBackgroundColor: #181B22;
    }

    body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
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
        font-family: inherit;
        font-size: 100%;
        line-height: 1.15;
        margin: 0;
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
        transition: background ${easeOutTiming};
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

        @media (max-width: 768px) {
            font-size: var(--baseMMobile);
        }
    }

    .classicButtonOutline {
        border: var(--borderRegular) solid var(--primaryColor);
        background: transparent;
        color: var(--primaryColor);
        padding: .4em 1em;
        transition: background ${easeOutTiming}, color ${easeOutTiming};

        &:hover {
            background: var(--primaryColor);
            color: white;
        }
    }
    `;
