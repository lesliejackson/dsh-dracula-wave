/**
 * Client half of `@local/dsh-dracula-wave`.
 *
 * Repaints the built-in dark palette with Wave Terminal's built-in Dracula
 * terminal theme. The source values were read from the installed Wave
 * Terminal (`resources/app.asar/dist/bin/wavesrv.x64.exe`, bundled
 * `termthemes.json`):
 *
 *   background #282A36  foreground #F8F8F2  black #21222C
 *   selection/cur. line #44475A  comment #6272A4
 *   purple #BD93F9  pink #FF79C6  cyan #8BE9FD  green #50FA7B
 *   red #FF5555  yellow #F1FA8C  orange #FFB86C
 *   bright: #D6ACFF #FF92DF #A4FFFF #69FF94 #FF6E6E #FFFFA5 #FFFFFF
 *
 * Deviation from the stock theme: primary text uses #D8D9E0 instead of the
 * Dracula foreground #F8F8F2 (see `--dsw-alias-label-primary` below). The
 * palette stop keeps the original value, so surfaces and mixes derived from it
 * are unchanged.
 *
 * The base token sheets declare the dark palette on
 * `body[data-ds-dark-theme]`; this sheet remaps the invariant `--dsw-static-*`
 * palette stops inside the same dark scope, so every alias token, component
 * and color-mix expression that reads them follows. A shorter block re-points
 * the few dark values the base sheets hard-code, and the syntax tokens get the
 * Dracula ANSI mapping. The sheet is attached only while the resolved theme is
 * the built-in `dark` id (explicit Dark, or Follow system on a dark OS): light
 * mode and registered third-party themes keep full ownership of the palette.
 *
 * Attachment is managed with ctx.effect/ctx.on so disabling the plugin, or
 * switching away from the built-in dark palette, removes the element and
 * restores the shipped colors immediately.
 */

const CSS = `/* Wave Terminal Dracula for the DSH dark palette. */
html body[data-ds-dark-theme] {
  /* Static neutral-bluish ramp (base #282a36, raised surfaces, sidebar #21222c). */
  --dsw-static-neutral-bluish-00: #ffffff;
  --dsw-static-neutral-bluish-50: #f8f8f2;
  --dsw-static-neutral-bluish-55: #f4f4f8;
  --dsw-static-neutral-bluish-60: #f1f1f6;
  --dsw-static-neutral-bluish-75: #ededf3;
  --dsw-static-neutral-bluish-90: #e9e9f0;
  --dsw-static-neutral-bluish-100: #e4e5ee;
  --dsw-static-neutral-bluish-150: #d8dae6;
  --dsw-static-neutral-bluish-200: #c9cce0;
  --dsw-static-neutral-bluish-300: #b6b9cd;
  --dsw-static-neutral-bluish-310: #a6a9c1;
  --dsw-static-neutral-bluish-400: #979ab5;
  --dsw-static-neutral-bluish-500: #7d7f9b;
  --dsw-static-neutral-bluish-600: #6a6d8a;
  --dsw-static-neutral-bluish-700: #555870;
  --dsw-static-neutral-bluish-750: #4a4d61;
  --dsw-static-neutral-bluish-800: #3f4255;
  --dsw-static-neutral-bluish-850: #353848;
  --dsw-static-neutral-bluish-875: #2e3140;
  --dsw-static-neutral-bluish-900: #21222c;
  --dsw-static-neutral-bluish-950: #282a36;
  --dsw-static-neutral-bluish-1000: #14151a;

  /* Static neutral ramp (cards, inline code, scrollbars, guide art). */
  --dsw-static-neutral-00: #ffffff;
  --dsw-static-neutral-50: #f8f8f2;
  --dsw-static-neutral-100: #ececef;
  --dsw-static-neutral-150: #e0e1e7;
  --dsw-static-neutral-200: #d3d5dd;
  --dsw-static-neutral-250: #c6c8d2;
  --dsw-static-neutral-300: #b5b7c3;
  --dsw-static-neutral-400: #999baa;
  --dsw-static-neutral-500: #7e8196;
  --dsw-static-neutral-550: #6e7189;
  --dsw-static-neutral-600: #5f6278;
  --dsw-static-neutral-700: #4b4e60;
  --dsw-static-neutral-800: #3a3d4b;
  --dsw-static-neutral-850: #30333f;
  --dsw-static-neutral-900: #23252f;
  --dsw-static-neutral-1000: #14151a;

  /* Cyan replaces the platform blue scale (selection, charts, trajectory). */
  --dsw-static-blue-50: #eafcff;
  --dsw-static-blue-50p: #e0faff;
  --dsw-static-blue-75: #d4f8ff;
  --dsw-static-blue-100: #c6f5ff;
  --dsw-static-blue-300: #a4ffff;
  --dsw-static-blue-400: #8be9fd;
  --dsw-static-blue-450: #7fe2f6;
  --dsw-static-blue-500: #73d9ee;
  --dsw-static-blue-600: #5cc6dc;
  --dsw-static-blue-800: #2f7f95;
  --dsw-static-blue-900: #1f5a6b;
  --dsw-static-blue-950: #143642;

  /* Dracula purple replaces the DeepSeek brand-blue scale (links, focus, info). */
  --dsw-static-deepseek-50: #f6edff;
  --dsw-static-deepseek-100: #ecdfff;
  --dsw-static-deepseek-200: #e0ccff;
  --dsw-static-deepseek-300: #d6acff;
  --dsw-static-deepseek-400: #bd93f9;
  --dsw-static-deepseek-450: #ad82f2;
  --dsw-static-deepseek-500: #9d6ce4;
  --dsw-static-deepseek-600: #8a5fd0;
  --dsw-static-deepseek-700-delete: #6d47a8;
  --dsw-static-deepseek-800: #4c3380;
  --dsw-static-deepseek-900: #322457;

  /* State scales. */
  --dsw-static-green-100: #e6ffef;
  --dsw-static-green-400: #69ff94;
  --dsw-static-green-500: #50fa7b;
  --dsw-static-green-500-a08: rgb(80 250 123 / 8%);
  --dsw-static-green-500-a12: rgb(80 250 123 / 12%);
  --dsw-static-green-900: #1f3b2b;
  --dsw-static-red-50: #fff0f0;
  --dsw-static-red-100: #ffdcdc;
  --dsw-static-red-400: #ff6e6e;
  --dsw-static-red-400-a12: rgb(255 110 110 / 12%);
  --dsw-static-red-500: #ff5555;
  --dsw-static-red-600: #f04b4b;
  --dsw-static-red-600-a08: rgb(255 85 85 / 8%);
  --dsw-static-red-900: #3d1f24;
  --dsw-static-amber-100: #fffbd6;
  --dsw-static-amber-400: #ffffa5;
  --dsw-static-amber-500: #f1fa8c;
  --dsw-static-amber-600: #ffb86c;
  --dsw-static-amber-900: #3a3826;
  --dsw-static-violet-400: #d6acff;
  --dsw-static-violet-600: #9d6ce4;

  /* Dark values the base sheet hard-codes rather than deriving from the palette. */
  /* Primary text is cooled off the stock foreground: the palette stop keeps
     Dracula's #f8f8f2 so every surface and mix derived from it stays put. */
  --dsw-alias-label-primary: #d8d9e0;
  --dsw-alias-bg-document-selection: rgba(189, 147, 249, 0.3);
  --dsw-alias-bg-mask-drop: rgba(40, 42, 54, 0.7);
  --dsw-menu-surface-fill: rgba(40, 42, 54, 0.64);
  --dsw-alias-menu-group-header-fill: rgba(40, 42, 54, 0.94);
  --dsw-alias-button-tool-bar-fill-invisible: rgba(20, 21, 26, 0.36);
  --dsw-alias-button-tool-bar-fill: rgba(68, 71, 90, 0.5);
  --dsw-alias-button-tool-bar-hover: rgba(68, 71, 90, 0.6);
  --dsw-alias-border-selected: #bd93f9;
  --dsw-alias-link: #8be9fd;
  --dsw-alias-label-caption: #9da0b8;
  --dsw-alias-toast-action: #d6acff;
  --dsw-alias-trajectory-accent: #bd93f9;
  --dsw-alias-file-diff-added-bg: rgb(35, 48, 40);
  --dsw-alias-file-diff-added-gutter: rgb(26, 37, 30);
  --dsw-alias-file-diff-added-marker: #50fa7b;
  --dsw-alias-file-diff-deleted-bg: rgb(58, 38, 41);
  --dsw-alias-file-diff-deleted-gutter: rgb(44, 28, 31);
  --dsw-alias-file-diff-deleted-marker: #ff5555;
  --dsw-alias-json-tree-hover: rgb(189 147 249 / 6%);
  --dsw-alias-json-tree-icon: #8b9bc4;
  --dsw-alias-json-tree-keyword: #ff79c6;
  --dsw-alias-json-tree-number: #bd93f9;
  --dsw-alias-json-tree-property: #8be9fd;
  --dsw-alias-json-tree-punctuation: #f8f8f2;
  --dsw-alias-json-tree-string: #f1fa8c;
  --dsw-specific-sidebar-right-flash: #bd93f9;

  /* Dracula syntax highlighting (shiki css-variables theme). */
  --shiki-token-constant: #bd93f9;
  --shiki-token-string: #f1fa8c;
  --shiki-token-comment: #6272a4;
  --shiki-token-keyword: #ff79c6;
  --shiki-token-parameter: #ffb86c;
  --shiki-token-function: #50fa7b;
  --shiki-token-string-expression: #f1fa8c;
  --shiki-token-punctuation: #f8f8f2;
  --shiki-token-link: #8be9fd;
}

/* The macOS menu material is re-bound at higher specificity by the base sheet. */
html[data-platform='darwin'] body[data-ds-dark-theme] {
  --dsw-specific-menu: rgba(40, 42, 54, 0.94);
}
`;

window.__ModuleLoader__.load({
  id: '@local/dsh-dracula-wave',
  factory() {
    return {
      inject: ['theme'],
      apply(ctx) {
        ctx.effect(() => {
          const style = document.createElement('style');
          style.setAttribute('data-dsh-plugin', '@local/dsh-dracula-wave');
          style.textContent = CSS;
          // The built-in dark palette is the only theme id this sheet may own:
          // `light` needs no override and a registered third-party theme (any
          // id) applies its own tokens, so both keep their shipped look.
          const sync = (snapshot) => {
            const wanted = snapshot.active.id === 'dark';
            if (wanted && !style.isConnected) document.head.appendChild(style);
            else if (!wanted && style.isConnected) style.remove();
          };
          sync(ctx.theme.getTheme());
          const off = ctx.on('theme/change', sync);
          return () => { off(); style.remove(); };
        }, '@local/dsh-dracula-wave: dark palette overrides');
      },
    };
  },
});
