import React, { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link, router } from '@inertiajs/react';
import { Input } from '@/components/ui/input';


interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    sale_price?: number;
    images: string[];
    brand: string;
    stock_quantity: number;
    category: {
        name: string;
        slug: string;
    };
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedProducts {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Props {
    products: PaginatedProducts;
    categories: Category[];
    brands: string[];
    filters: {
        category?: string;
        brand?: string;
        min_price?: string;
        max_price?: string;
        search?: string;
        sort?: string;
        order?: string;
    };
    [key: string]: unknown;
}

export default function ProductsIndex({ products, categories, brands, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [selectedBrand, setSelectedBrand] = useState(filters.brand || '');
    const [minPrice, setMinPrice] = useState(filters.min_price || '');
    const [maxPrice, setMaxPrice] = useState(filters.max_price || '');

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        if (selectedCategory) params.set('category', selectedCategory);
        if (selectedBrand) params.set('brand', selectedBrand);
        if (minPrice) params.set('min_price', minPrice);
        if (maxPrice) params.set('max_price', maxPrice);
        
        router.get('/products?' + params.toString());
    };

    const handleAddToCart = (productId: number) => {
        router.post(route('cart.store'), {
            product_id: productId,
            quantity: 1,
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    return (
        <AppShell>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-4">🛒 All Products</h1>
                        <p className="text-gray-400">Browse our complete catalog of PC components</p>
                    </div>

                    {/* Filters */}
                    <Card className="mb-8 bg-slate-800/50 border-slate-700">
                        <CardHeader>
                            <CardTitle className="text-white">🔍 Filter Products</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                                <Input
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-slate-700 border-slate-600 text-white"
                                />
                                
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.slug}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={selectedBrand}
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                    className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                                >
                                    <option value="">All Brands</option>
                                    {brands.map((brand) => (
                                        <option key={brand} value={brand}>
                                            {brand}
                                        </option>
                                    ))}
                                </select>

                                <Input
                                    placeholder="Min Price"
                                    type="number"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="bg-slate-700 border-slate-600 text-white"
                                />

                                <Input
                                    placeholder="Max Price"
                                    type="number"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="bg-slate-700 border-slate-600 text-white"
                                />
                            </div>
                            
                            <Button onClick={handleSearch} className="bg-purple-600 hover:bg-purple-700">
                                Apply Filters
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Results Info */}
                    <div className="mb-6">
                        <p className="text-gray-400">
                            Showing {products.data.length} of {products.total} products
                        </p>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {products.data.map((product) => (
                            <Card key={product.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-200 hover:scale-105">
                                <CardHeader className="p-4">
                                    <div className="aspect-square bg-slate-700 rounded-lg mb-3 flex items-center justify-center">
                                        <span className="text-4xl">🖥️</span>
                                    </div>
                                    <div className="flex items-center justify-between mb-2">
                                        <Badge variant="secondary" className="text-xs">
                                            {product.brand}
                                        </Badge>
                                        {product.sale_price && (
                                            <Badge variant="destructive" className="text-xs">
                                                Sale
                                            </Badge>
                                        )}
                                    </div>
                                    <CardTitle className="text-white text-sm leading-tight">
                                        {product.name}
                                    </CardTitle>
                                    <CardDescription className="text-xs text-gray-400">
                                        {product.category.name}
                                    </CardDescription>
                                    <div className="text-xs text-gray-500">
                                        Stock: {product.stock_quantity}
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex flex-col">
                                            {product.sale_price ? (
                                                <>
                                                    <span className="text-lg font-bold text-green-400">
                                                        {formatPrice(product.sale_price)}
                                                    </span>
                                                    <span className="text-sm text-gray-500 line-through">
                                                        {formatPrice(product.price)}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-lg font-bold text-white">
                                                    {formatPrice(product.price)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/products/${product.slug}`}
                                            className="flex-1"
                                        >
                                            <Button variant="outline" size="sm" className="w-full text-xs">
                                                View Details
                                            </Button>
                                        </Link>
                                        {product.stock_quantity > 0 ? (
                                            <Button
                                                size="sm"
                                                className="flex-1 bg-purple-600 hover:bg-purple-700 text-xs"
                                                onClick={() => handleAddToCart(product.id)}
                                            >
                                                Add to Cart
                                            </Button>
                                        ) : (
                                            <Button
                                                size="sm"
                                                disabled
                                                className="flex-1 text-xs"
                                            >
                                                Out of Stock
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    {products.last_page > 1 && (
                        <div className="flex justify-center">
                            <nav className="flex space-x-2">
                                {products.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 rounded-md text-sm ${
                                            link.active
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        preserveState
                                    >
                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}