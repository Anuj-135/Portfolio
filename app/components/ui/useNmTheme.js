/**
 * useNmTheme — central neumorphic design token hook
 * Returns all shadow, color, and surface tokens based on darkMode.
 * Import once per section instead of repeating inline.
 */
export function useNmTheme(darkMode) {
    const d = darkMode

    return {
        pageBg: d ? '#0d0d1a' : '#e8e8f0',
        accent: '#6c63ff',

        // Shadows
        raised: d
            ? '6px 6px 16px #07071099, -6px -6px 16px #131324'
            : '6px 6px 16px #c8c8d0, -6px -6px 16px #ffffff',
        raisedSm: d
            ? '4px 4px 10px #07071099, -4px -4px 10px #131324'
            : '4px 4px 10px #c8c8d0, -4px -4px 10px #ffffff',
        inset: d
            ? 'inset 3px 3px 8px #07071099, inset -3px -3px 8px #13132480'
            : 'inset 3px 3px 8px #c0c0c8, inset -3px -3px 8px #ffffff',
        insetShadow: d
            ? 'inset 3px 3px 8px #07071099, inset -3px -3px 8px #13132480'
            : 'inset 3px 3px 8px #c0c0c8, inset -3px -3px 8px #ffffff',

        // Text
        text: d ? '#f0ede8' : '#1a1a2e',
        muted: d ? 'rgba(240,237,232,0.45)' : 'rgba(26,26,46,0.50)',
        lbl: d ? 'rgba(240,237,232,0.28)' : 'rgba(26,26,46,0.32)',

        // Misc
        divider: d ? 'rgba(255,255,255,0.06)' : 'rgba(26,26,46,0.07)',
        canvasBg: d ? '#13132a' : '#fafafe',
        divClr: d ? 'rgba(255,255,255,0.06)' : 'rgba(26,26,46,0.08)',
        hintColor: d ? 'rgba(255,255,255,0.4)' : 'rgba(108,99,255,0.4)',
    }
}