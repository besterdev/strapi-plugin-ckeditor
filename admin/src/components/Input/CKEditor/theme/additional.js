import { css } from "styled-components";

export const additional = css`
  /* --- expanding --- */

  .ck.ck-editor__main .ck-blurred {
    max-height: 200px;
  }
  .ck.ck-editor__main .ck-focused {
    max-height: 700px;
  }

  /* --- color-grid --- */

  .ck.ck-color-ui-dropdown {
    --ck-color-grid-tile-size: 22px !important;
  }
  .ck.ck-color-grid__tile {
    width: auto;
  }
  .ck.ck-color-ui-dropdown .ck-color-grid {
    grid-gap: 2px;
  }
  .ck.ck-color-ui-dropdown .ck-color-grid .ck-button {
    border-radius: 2px;
  }
  .ck.ck-color-ui-dropdown
    .ck.ck-color-grid
    .ck-color-grid__tile:hover:not(.ck-disabled),
  .ck.ck-color-ui-dropdown
    .ck.ck-color-grid
    .ck-color-grid__tile:focus:not(.ck-disabled) {
    z-index: 1;
    transform: scale(1.1);
    border-radius: 2px;
  }

  /* ---- Style feature config ------------------------------------------------------ */

  :root {
    --ck-georgia-serif-font-stack: Georgia, Times, Times New Roman, serif;
  }

  .ck-content h1.document-title {
    font-family: var(--ck-georgia-serif-font-stack);
    font-size: 50px;
    font-weight: bold;
    border: 0;
  }

  .ck-content h2.document-subtitle {
    font-family: var(--ck-georgia-serif-font-stack);
    font-size: 20px;
    font-weight: bold;
    color: #d1d1d1;
    letter-spacing: 10px;
  }

  .ck-content p.callout {
    --border-color: #e91e1e;
    padding: 1.2em 2em;
    border: 1px solid var(--border-color);
    border-left: 10px solid var(--border-color);
    background: #fff9fb;
    border-radius: 5px;
    margin: 1.5em 2em;
    box-shadow: 5px 5px 0 #ffe6ef;
  }

  .ck-content hr {
    height: 0 !important;
    border-top: 1px solid #dee2e6 !important;
  }

  .ck-content blockquote.side-quote {
    font-family: var(--ck-georgia-serif-font-stack);
    font-style: normal;
    float: right;
    width: 35%;
    position: relative;
    border: 0;
    overflow: visible;
    z-index: 1;
    margin-left: 1em;
  }

  .ck-content blockquote.side-quote::before {
    content: "“";
    position: absolute;
    top: -37px;
    left: -10px;
    display: block;
    font-size: 200px;
    color: #e7e7e7;
    z-index: -1;
    line-height: 1;
  }

  .ck-content blockquote.side-quote p {
    font-size: 2em;
    line-height: 1;
  }

  .ck-content blockquote.side-quote p:last-child:not(:first-child) {
    font-size: 1.3em;
    text-align: right;
    color: #555;
  }

  .ck-content span.needs-clarification {
    outline: 1px dashed #c8a24b;
    background: #ffe19c;
    border-radius: 2px;
    position: relative;
  }

  .ck-content span.needs-clarification::after {
    content: "?";
    display: inline-block;
    color: #fff;
    background: #3b3b3b;
    font-size: 12px;
    vertical-align: super;
    width: 12px;
    height: 12px;
    line-height: 12px;
    border-radius: 10px;
    text-align: center;
    position: absolute;
    right: -6px;
    top: -6px;
    font-weight: bold;
    letter-spacing: initial;
  }

  .ck-content span.wide-spacing {
    letter-spacing: 0.3em;
  }

  .ck-content span.small-caps {
    font-variant: small-caps;
  }

  .ck-content span.spoiler {
    background: #000;
    color: #000;
  }

  .ck-content span.spoiler:hover {
    background: #000;
    color: #fff;
  }

  .ck-content pre.stylish-code {
    border-color: transparent;
    margin-left: 2em;
    margin-right: 2em;
    border-radius: 10px;
  }

  .ck-content pre.stylish-code::before {
    content: "";
    display: block;
    height: 13px;
    background: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NCAxMyI+CiAgPGNpcmNsZSBjeD0iNi41IiBjeT0iNi41IiByPSI2LjUiIGZpbGw9IiNGMzZCNUMiLz4KICA8Y2lyY2xlIGN4PSIyNi41IiBjeT0iNi41IiByPSI2LjUiIGZpbGw9IiNGOUJFNEQiLz4KICA8Y2lyY2xlIGN4PSI0Ny41IiBjeT0iNi41IiByPSI2LjUiIGZpbGw9IiM1NkM0NTMiLz4KPC9zdmc+Cg==);
    margin-bottom: 8px;
    background-repeat: no-repeat;
  }

  .ck-content pre.stylish-code-dark,
  .ck-content pre.stylish-code-bright {
    padding: 1em;
  }

  .ck-content pre.stylish-code-dark {
    background: #272822;
    box-shadow: 5px 5px 0 #0000001f;
    color: white;
  }

  .ck-content pre.stylish-code-dark code {
    color: white;
  }

  .ck-content pre.stylish-code-bright {
    background: #dddfe0;
    color: #000;
    box-shadow: 5px 5px 0 #b3b3b3;
  }

  .ck-content pre.stylish-code-bright code {
    color: #222;
  }

  .ck-content a.button-link {
    text-decoration: none;
    background-color: rgb(0, 130, 239);
    padding: 8px 20px;
    color: rgb(255 255 255) !important;
    border-radius: 32px;
  }

  .ck-content a.button-link:hover {
    text-decoration: none;
    background-color: #339bf2 !important;
    padding: 8px 20px;
    color: rgb(255 255 255);
    border-radius: 32px;
  }

  .ck-content a.link {
    text-decoration: underline;
    color: #0082ef !important;
  }

  .ck-content a.link:hover {
    color: #0068bf !important;
  }

  .ck-content span.button-link-icon {
    background: url("../icons/documentation_fund_transfer_fund_transfer_ktb_banner_krungthai.png");
    width: 100px;
    height: 100px;
  }

  .ck-content .document-heading {
    color: #161616 !important;
    font-size: 40px;
    font-weight: 700;
    line-height: 56px;
    letter-spacing: 0px;
    text-align: left;
  }

  .ck.ck-content h4.document-step-title {
    color: #0082ef !important;
    font-size: 20px;
    font-weight: 700;
    line-height: 32px;
    padding-top: 108px;
    padding-bottom: 24px;
    margin-top: -72px;
    display: block;
    position: relative;
  }

  .ck.ck-content h4.table-title {
    display: block;
    position: relative;
    padding: 0 !important;
    font-size: 16px;
    margin: 5px 0px;
  }

  .ck.ck-content p.document-info-box-blue {
    background-color: #d7edff;
    padding: 14px;
    border-radius: 10px;
  }

  .ck.ck-content p.document-info-box-yellow {
    background-color: #f9ebc5;
    padding: 14px;
    border-radius: 10px;
    display: flex;
  }

  .ck.ck-content .oapi-blue-color {
    color: #0082ef !important;
    background: none;
    display: block;
  }

  .ck.ck-content .oapi-lightBlue-color {
    color: rgb(136, 238, 255) !important;
    background: none;
    display: block;
  }

  .ck.ck-content .oapi-grey-color {
    color: #ffffff !important;
    background: none;
    display: block;
  }

  .ck.ck-content .oapi-cream-color {
    color: rgb(249, 235, 197) !important;
    background: none;
    display: block;
  }

  .ck.ck-content p.document-subtitle {
    font-size: 14px;
    font-weight: 400;
    color: rgb(108, 117, 125);
  }

  .ck.ck-content .oapi-grey-quote {
    color: #495057;
    border-radius: 12px;
    padding-block: 5px;
    display: inline-block;
    padding-inline: 6px;
    background-color: #e9ecef;
  }

  .ck-content .table table {
    border-style: none;
  }

  .ck-content .table table td {
    border-style: none none solid;
  }

  .ck-content pre[data-language]:after {
    display: none;
  }

  .ck-content a.link {
    text-decoration: underline;
    color: #0082ef !important;
  }

  .ck-content a.link:hover {
    color: #0068bf !important;
  }

  .ck-content a.button-link {
    text-decoration: none;
    background-color: rgb(0, 130, 239);
    padding: 8px 20px;
    color: rgb(255 255 255) !important;
    border-radius: 32px;
  }

  .ck-content a.button-link:hover {
    text-decoration: none;
    background-color: #339bf2 !important;
    padding: 8px 20px;
    color: rgb(255 255 255);
    border-radius: 32px;
  }

  .ck-content a.button-outline-link {
    text-decoration: none;
    padding: 8px 20px;
    background: transparent;
    color: #0082ef;
    border: 1px solid #339bf2;
    border-radius: 32px;
  }

  .ck-content a.button-outline-link:hover {
    transition: all 0.2s ease-in;
    color: rgb(255 255 255);
    background: #339bf2 !important;
  }

  .ck-content .img-wrapper--border img {
    border-radius: 12px;
  }

  .ck-content .img-wrapper--whyus-icon img {
    width: 48px;
    height: 48px;
  }
`;
