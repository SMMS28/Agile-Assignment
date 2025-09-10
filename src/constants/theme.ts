// ================================
// THEME CONSTANTS
// ================================

export const THEME = {
  gradients: {
    background: 'bg-gradient-to-br from-emerald-50/50 via-teal-50/50 to-cyan-50/50 dark:bg-gradient-to-br dark:from-emerald-900/20 dark:via-teal-900/20 dark:to-cyan-900/20',
    button: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600',
    footer: 'bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-800 dark:bg-gradient-to-r dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900',
    section: 'bg-gradient-to-br from-emerald-50/30 via-teal-50/30 to-cyan-50/30 dark:bg-gradient-to-br dark:from-emerald-950/50 dark:via-teal-950/50 dark:to-cyan-950/50',
    sectionAlt: 'bg-gradient-to-br from-teal-50/50 via-emerald-50/50 to-cyan-50/50 dark:bg-gradient-to-br dark:from-teal-900/30 dark:via-emerald-900/30 dark:to-cyan-900/30'
  },
  glassmorphism: {
    card: 'bg-emerald-50/70 dark:bg-emerald-800/20 backdrop-blur-xl border border-emerald-200/40 dark:border-emerald-700/30',
    panel: 'bg-emerald-100/30 dark:bg-emerald-900/20 backdrop-blur-xl border border-emerald-200/30 dark:border-emerald-700/30 rounded-l-3xl',
    panelRight: 'bg-emerald-100/30 dark:bg-emerald-900/20 backdrop-blur-xl border border-emerald-200/30 dark:border-emerald-700/30 rounded-r-3xl',
    button: 'bg-emerald-100/50 dark:bg-emerald-900/40 border border-emerald-200/30 dark:border-emerald-700/30',
    modal: 'bg-emerald-50/30 dark:bg-emerald-900/20 backdrop-blur-xl border border-emerald-200/30 dark:border-emerald-700/30',
    header: 'bg-emerald-100/40 dark:bg-emerald-900/20 backdrop-blur-xl border border-emerald-200/30 dark:border-emerald-700/30'
  },
  colors: {
    primary: 'emerald-500',
    primaryHover: 'emerald-600',
    secondary: 'teal-500',
    accent: 'cyan-500'
  },
  text: {
    primary: 'text-slate-900 dark:text-slate-50',
    secondary: 'text-slate-700 dark:text-slate-200',
    muted: 'text-slate-600 dark:text-slate-300',
    inverse: 'text-white dark:text-slate-900'
  }
} as const
