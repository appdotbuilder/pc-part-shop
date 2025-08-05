import React, { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link, router } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    slug: string;
    description?: string;
    short_description?: string;
    sku: string;
    price: number;
    sale_price?: number;
    brand: string;
    images: string[];
    specifications?: Record<string, unknown>;
    stock_quantity: number;
    manage_stock: boolean;
    category: {
        id: number;
        name: string;
        slug: string;
    };
}

interface Props {
    product: Product;
    relatedProducts: Product[];
    [key: string]: unknown;
}

export default function ProductShow({ product, relatedProducts }: Props) {
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    const handleAddToCart = () => {
        router.post(route('cart.store'), {
            product_id: product.id,
            quantity: quantity,
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    const isInStock = product.manage_stock ? product.stock_quantity > 0 : true;
    const maxQuantity = product.manage_stock ? product.stock_quantity : 10;

    return (
        <AppShell>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    {/* Breadcrumb */}
                    <nav className="mb-8">
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <Link href="/" className="hover:text-white">Home</Link>
                            <span>/</span>
                            <Link href="/products" className="hover:text-white">Products</Link>
                            <span>/</span>
                            <Link href={`/products?category=${product.category.slug}`} className="hover:text-white">
                                {product.category.name}
                            </Link>
                            <span>/</span>
                            <span className="text-white">{product.name}</span>
                        </div>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                        {/* Product Images */}
                        <div>
                            <div className="aspect-square bg-slate-800 rounded-lg mb-4 flex items-center justify-center">
                                <span className="text-8xl">🖥️</span>
                            </div>
                            
                            {product.images && product.images.length > 1 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {product.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`aspect-square bg-slate-700 rounded-lg flex items-center justify-center text-2xl ${
                                                selectedImage === index ? 'ring-2 ring-purple-500' : ''
                                            }`}
                                        >
                                            🖥️
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div>
                            <div className="mb-4">
                                <Badge variant="secondary" className="mb-2">
                                    {product.brand}
                                </Badge>
                                <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
                                <p className="text-gray-400 mb-4">SKU: {product.sku}</p>
                                
                                {product.short_description && (
                                    <p className="text-gray-300 mb-4">{product.short_description}</p>
                                )}
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                {product.sale_price ? (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-3xl font-bold text-green-400">
                                            {formatPrice(product.sale_price)}
                                        </span>
                                        <span className="text-xl text-gray-500 line-through">
                                            {formatPrice(product.price)}
                                        </span>
                                        <Badge variant="destructive">Sale</Badge>
                                    </div>
                                ) : (
                                    <span className="text-3xl font-bold text-white">
                                        {formatPrice(product.price)}
                                    </span>
                                )}
                            </div>

                            {/* Stock Status */}
                            <div className="mb-6">
                                {isInStock ? (
                                    <div className="flex items-center space-x-2">
                                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                        <span className="text-green-400">
                                            In Stock {product.manage_stock && `(${product.stock_quantity} available)`}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                                        <span className="text-red-400">Out of Stock</span>
                                    </div>
                                )}
                            </div>

                            {/* Add to Cart */}
                            {isInStock && (
                                <div className="mb-8">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <label className="text-white font-medium">Quantity:</label>
                                        <Input
                                            type="number"
                                            min="1"
                                            max={maxQuantity}
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, Math.min(maxQuantity, parseInt(e.target.value) || 1)))}
                                            className="w-20 bg-slate-700 border-slate-600 text-white"
                                        />
                                    </div>
                                    
                                    <Button
                                        size="lg"
                                        onClick={handleAddToCart}
                                        className="w-full bg-purple-600 hover:bg-purple-700"
                                    >
                                        Add to Cart - {formatPrice((product.sale_price || product.price) * quantity)}
                                    </Button>
                                </div>
                            )}

                            {/* Category */}
                            <div className="mb-4">
                                <p className="text-gray-400">
                                    Category: 
                                    <Link 
                                        href={`/products?category=${product.category.slug}`}
                                        className="text-purple-400 hover:text-purple-300 ml-1"
                                    >
                                        {product.category.name}
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Product Description */}
                    {product.description && (
                        <Card className="mb-8 bg-slate-800/50 border-slate-700">
                            <CardHeader>
                                <CardTitle className="text-white">📋 Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-gray-300 whitespace-pre-line">
                                    {product.description}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Specifications */}
                    {product.specifications && Object.keys(product.specifications).length > 0 && (
                        <Card className="mb-8 bg-slate-800/50 border-slate-700">
                            <CardHeader>
                                <CardTitle className="text-white">⚙️ Specifications</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <div key={key} className="flex justify-between py-2 border-b border-slate-600">
                                            <span className="text-gray-400">{key}:</span>
                                            <span className="text-white">{String(value)}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">🔗 Related Products</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedProducts.map((relatedProduct) => (
                                    <Card key={relatedProduct.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-200">
                                        <CardHeader className="p-4">
                                            <div className="aspect-square bg-slate-700 rounded-lg mb-3 flex items-center justify-center">
                                                <span className="text-4xl">🖥️</span>
                                            </div>
                                            <CardTitle className="text-white text-sm leading-tight">
                                                {relatedProduct.name}
                                            </CardTitle>
                                            <CardDescription className="text-xs text-gray-400">
                                                {relatedProduct.category.name}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-0">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex flex-col">
                                                    {relatedProduct.sale_price ? (
                                                        <>
                                                            <span className="text-lg font-bold text-green-400">
                                                                {formatPrice(relatedProduct.sale_price)}
                                                            </span>
                                                            <span className="text-sm text-gray-500 line-through">
                                                                {formatPrice(relatedProduct.price)}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="text-lg font-bold text-white">
                                                            {formatPrice(relatedProduct.price)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <Link href={`/products/${relatedProduct.slug}`}>
                                                <Button variant="outline" size="sm" className="w-full text-xs">
                                                    View Product
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}