/**
 * Placeholder images from Unsplash for product categories
 * Used when products don't have custom images
 */

export const categoryImages: Record<string, string[]> = {
  'entradas': [
    'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400&h=400&fit=crop', // ceviche
    'https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=400&h=400&fit=crop', // tacos
    'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=400&fit=crop', // appetizers
  ],
  'carnes': [
    'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&h=400&fit=crop', // steak
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop', // ribs
  ],
  'del-mar': [
    'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=400&fit=crop', // salmon
    'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=400&h=400&fit=crop', // tuna
    'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=400&h=400&fit=crop', // octopus
  ],
  'pastas': [
    'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=400&fit=crop', // pasta
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=400&fit=crop', // risotto
  ],
  'burgers': [
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop', // burger
    'https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&h=400&fit=crop', // gourmet burger
  ],
  'sides': [
    'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=400&fit=crop', // fries
    'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=400&h=400&fit=crop', // sides
  ],
  'ensaladas': [
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop', // salad
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop', // fresh salad
  ],
  'menu-infantil': [
    'https://images.unsplash.com/photo-1619881590738-a111d176d936?w=400&h=400&fit=crop', // kids food
    'https://images.unsplash.com/photo-1625937329935-325316673416?w=400&h=400&fit=crop', // kids meal
  ],
  'postres': [
    'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop', // brownie
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop', // tiramisu
    'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&h=400&fit=crop', // flan
    'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop', // cake
  ],
  'cocktails': [
    'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=400&fit=crop', // cocktail
    'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&h=400&fit=crop', // mojito
    'https://images.unsplash.com/photo-1609345265499-2133bbeb6ce5?w=400&h=400&fit=crop', // margarita
    'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=400&fit=crop', // martini
  ],
  'mocktails': [
    'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop', // mocktail
    'https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?w=400&h=400&fit=crop', // fresh drink
  ],
  'sangrias': [
    'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop', // sangria
    'https://images.unsplash.com/photo-1569885459254-e6c79aec7b85?w=400&h=400&fit=crop', // sangria pitcher
  ],
  'champanas': [
    'https://images.unsplash.com/photo-1594372365401-3b5ff14eaaed?w=400&h=400&fit=crop', // champagne
    'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=400&fit=crop', // champagne glass
  ],
  'espumantes': [
    'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=400&h=400&fit=crop', // prosecco
    'https://images.unsplash.com/photo-1598522325074-042db73aa4e6?w=400&h=400&fit=crop', // sparkling wine
  ],
  'vinos-tintos': [
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=400&fit=crop', // red wine
    'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=400&fit=crop', // wine glass
  ],
  'vinos-blancos': [
    'https://images.unsplash.com/photo-1566995541428-f2246c17cda1?w=400&h=400&fit=crop', // white wine
    'https://images.unsplash.com/photo-1587150397172-c8c4bb2ba305?w=400&h=400&fit=crop', // white wine glass
  ],
  'vinos-rosados': [
    'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=400&h=400&fit=crop', // rose wine
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=400&fit=crop', // rose glass
  ],
};

/**
 * Get a placeholder image URL for a product
 * @param categorySlug - The category slug (e.g., 'cocktails', 'entradas')
 * @param index - The index of the product (for variety)
 * @returns Unsplash image URL
 */
export function getPlaceholderImage(categorySlug: string, index: number = 0): string {
  const images = categoryImages[categorySlug] || categoryImages['entradas'];
  return images[index % images.length];
}

/**
 * Get all placeholder images for a category
 * @param categorySlug - The category slug
 * @returns Array of image URLs
 */
export function getCategoryImages(categorySlug: string): string[] {
  return categoryImages[categorySlug] || categoryImages['entradas'];
}
