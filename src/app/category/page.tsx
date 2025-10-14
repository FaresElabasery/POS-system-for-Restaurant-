import { Separator } from '@/components/ui/separator';
import { ICategory } from '@/Interfaces/category';
import { getCategories } from '@/services/categoreis';
import AddCategoryModal from '../_components/shared/AddCategoryModal/AddCategoryModal';
import CategoryCard from '../_components/shared/CategoryCard/CategoryCard';

export default async function Category() {
    const data: ICategory[] = await getCategories()
    return (
        <div className="Category">
            <div className="container">
                <div className='title my-10 flex-center gap-2'>
                    <h1 className='text-5xl font-bold text-center'>All Category</h1>
                    <AddCategoryModal />
                </div>
                <div className='flex items-end flex-col'>
                    <Separator className="my-4" />
                    <span className='text-sm font-medium text-center text-gray-400'>Category Lenght : {data.length}</span>
                </div>
                <div className="category grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5">
                    {data.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </div>
        </div>
    )
}
