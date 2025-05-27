import type { ProductCategory } from '../types/Product';

interface CategoryFilterProps {
  selectedCategories: ProductCategory[];
  onCategoryChange: (category: ProductCategory) => void;
  onClose?: () => void;
}

export function CategoryFilter({ selectedCategories, onCategoryChange, onClose }: CategoryFilterProps) {
  const categories: { value: ProductCategory; label: string }[] = [
    { value: 'perifericos', label: 'Periféricos' },
    { value: 'componentes', label: 'Componentes' },
    { value: 'eletronicos', label: 'Eletrônicos' },
  ];

  const handleCategoryClick = (category: ProductCategory) => {
    onCategoryChange(category);
    onClose?.();
  };

  return (
    <div className="bg-[#44475a] p-3 rounded-lg shadow-lg mb-4">
      <h2 className="text-[#f8f8f2] font-semibold mb-2 text-lg">Categorias</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <label key={category.value} className="flex items-center space-x-2 text-[#f8f8f2] cursor-pointer hover:text-[#bd93f9] transition-colors">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.value)}
              onChange={() => handleCategoryClick(category.value)}
              className="form-checkbox h-4 w-4 text-[#bd93f9] rounded border-[#6272a4] bg-[#282a36] focus:ring-[#bd93f9] focus:ring-offset-[#282a36]"
            />
            <span>{category.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
} 