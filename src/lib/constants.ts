export const PRODUCT_TAGS = {
  'vegetarian': {
    label_es: 'Vegetariano',
    label_en: 'Vegetarian',
    icon: '🥬',
    color: 'green'
  },
  'vegan': {
    label_es: 'Vegano',
    label_en: 'Vegan',
    icon: '🌱',
    color: 'green'
  },
  'gluten-free': {
    label_es: 'Sin Gluten',
    label_en: 'Gluten Free',
    icon: '🌾',
    color: 'amber'
  },
  'spicy': {
    label_es: 'Picante',
    label_en: 'Spicy',
    icon: '🌶️',
    color: 'red'
  },
  'contains-nuts': {
    label_es: 'Contiene Nueces',
    label_en: 'Contains Nuts',
    icon: '🥜',
    color: 'orange'
  },
  'contains-dairy': {
    label_es: 'Contiene Lácteos',
    label_en: 'Contains Dairy',
    icon: '🥛',
    color: 'blue'
  },
  'contains-seafood': {
    label_es: 'Contiene Mariscos',
    label_en: 'Contains Seafood',
    icon: '🦐',
    color: 'cyan'
  },
  'chef-special': {
    label_es: 'Especial del Chef',
    label_en: "Chef's Special",
    icon: '⭐',
    color: 'gold'
  },
  'new': {
    label_es: 'Nuevo',
    label_en: 'New',
    icon: '✨',
    color: 'purple'
  },
} as const

export type ProductTag = keyof typeof PRODUCT_TAGS

export const TAG_COLORS: Record<string, string> = {
  green: 'bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-500/20',
  amber: 'bg-amber-500/10 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20',
  red: 'bg-red-500/10 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-500/20',
  orange: 'bg-orange-500/10 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400 border-orange-500/20',
  blue: 'bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/20',
  cyan: 'bg-cyan-500/10 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-400 border-cyan-500/20',
  gold: 'bg-accent/10 text-accent border-accent/20',
  purple: 'bg-purple-500/10 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 border-purple-500/20',
}
