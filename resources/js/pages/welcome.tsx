import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link, router } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    sale_price?: number;
    images: string[];
    brand: string;
    is_featured: boolean;
    category: {
        name: string;
        slug: string;
    };
}

interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
}

interface Props {
    featuredProducts: Product[];
    categories: Category[];
    [key: string]: unknown;
}

export default function Welcome({ featuredProducts, categories }: Props) {
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
                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20" />
                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold sm:text-6xl">
                                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    🚀 PC Parts Store
                                </span>
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                                Build your dream gaming rig with premium components from top brands. 
                                Graphics cards, processors, motherboards, and more - all at competitive prices.
                            </p>
                            
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link href="/products">
                                    <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                                        Shop Now 🛒
                                    </Button>
                                </Link>
                                <Link href="/auth/register">
                                    <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-gray-900">
                                        Create Account
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories Section */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">🔧 Shop by Category</h2>
                        <p className="text-gray-400">Find the perfect components for your build</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/products?category=${category.slug}`}
                                className="group"
                            >
                                <Card className="h-full bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-200 hover:scale-105">
                                    <CardHeader>
                                        <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                                            {category.name}
                                        </CardTitle>
                                        <CardDescription className="text-gray-400">
                                            {category.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Featured Products Section */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">⭐ Featured Products</h2>
                        <p className="text-gray-400">Hand-picked components for enthusiasts</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
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
                                                View
                                            </Button>
                                        </Link>
                                        <Button
                                            size="sm"
                                            className="flex-1 bg-purple-600 hover:bg-purple-700 text-xs"
                                            onClick={() => handleAddToCart(product.id)}
                                        >
                                            Add 🛒
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Features Section */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">✨ Why Choose Us?</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-4xl mb-4">🚚</div>
                            <h3 className="text-xl font-bold text-white mb-2">Fast Shipping</h3>
                            <p className="text-gray-400">Free shipping on orders over $100</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-4">🛡️</div>
                            <h3 className="text-xl font-bold text-white mb-2">Quality Guarantee</h3>
                            <p className="text-gray-400">All products come with manufacturer warranty</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-4">💬</div>
                            <h3 className="text-xl font-bold text-white mb-2">Expert Support</h3>
                            <p className="text-gray-400">24/7 customer support for build advice</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}