import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Link, router } from '@inertiajs/react';

interface CartItem {
    id: number;
    quantity: number;
    price: number;
    subtotal: number;
    product: {
        id: number;
        name: string;
        slug: string;
        brand: string;
        stock_quantity: number;
        manage_stock: boolean;
        category: {
            name: string;
        };
    };
}

interface Cart {
    id: number;
    total: number;
    total_quantity: number;
    items: CartItem[];
}

interface Props {
    cart?: Cart;
    [key: string]: unknown;
}

export default function CartIndex({ cart }: Props) {
    const handleUpdateQuantity = (itemId: number, quantity: number) => {
        if (quantity < 1) return;
        
        router.patch(route('cart.update', itemId), {
            quantity: quantity,
        }, {
            preserveState: true,
        });
    };

    const handleRemoveItem = (itemId: number) => {
        router.delete(route('cart.destroy', itemId), {
            preserveState: true,
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <AppShell>
                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
                        <Card className="bg-slate-800/50 border-slate-700 text-center py-12">
                            <CardContent>
                                <div className="text-6xl mb-4">🛒</div>
                                <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
                                <p className="text-gray-400 mb-6">Start building your dream PC setup!</p>
                                <Link href="/products">
                                    <Button className="bg-purple-600 hover:bg-purple-700">
                                        Browse Products
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-4">🛒 Shopping Cart</h1>
                        <p className="text-gray-400">
                            {cart.total_quantity} {cart.total_quantity === 1 ? 'item' : 'items'} in your cart
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <Card className="bg-slate-800/50 border-slate-700">
                                <CardHeader>
                                    <CardTitle className="text-white">Items</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    {cart.items.map((item, index) => (
                                        <div key={item.id} className={`p-6 ${index !== cart.items.length - 1 ? 'border-b border-slate-600' : ''}`}>
                                            <div className="flex items-center space-x-4">
                                                {/* Product Image */}
                                                <div className="w-20 h-20 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <span className="text-2xl">🖥️</span>
                                                </div>

                                                {/* Product Info */}
                                                <div className="flex-1 min-w-0">
                                                    <Link
                                                        href={`/products/${item.product.slug}`}
                                                        className="text-white font-medium hover:text-purple-400 block truncate"
                                                    >
                                                        {item.product.name}
                                                    </Link>
                                                    <p className="text-sm text-gray-400">{item.product.brand}</p>
                                                    <p className="text-sm text-gray-500">{item.product.category.name}</p>
                                                    <p className="text-sm font-medium text-white mt-1">
                                                        {formatPrice(item.price)} each
                                                    </p>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        className="w-8 h-8 p-0"
                                                    >
                                                        -
                                                    </Button>
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        max={item.product.manage_stock ? item.product.stock_quantity : 99}
                                                        value={item.quantity}
                                                        onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                                                        className="w-16 text-center bg-slate-700 border-slate-600 text-white"
                                                    />
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                        disabled={item.product.manage_stock && item.quantity >= item.product.stock_quantity}
                                                        className="w-8 h-8 p-0"
                                                    >
                                                        +
                                                    </Button>
                                                </div>

                                                {/* Subtotal */}
                                                <div className="text-right">
                                                    <p className="font-bold text-white">
                                                        {formatPrice(item.subtotal)}
                                                    </p>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="mt-2 text-xs"
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <Card className="bg-slate-800/50 border-slate-700 sticky top-8">
                                <CardHeader>
                                    <CardTitle className="text-white">💰 Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-gray-300">
                                            <span>Subtotal:</span>
                                            <span>{formatPrice(cart.total)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-300">
                                            <span>Shipping:</span>
                                            <span>$10.00</span>
                                        </div>
                                        <div className="flex justify-between text-gray-300">
                                            <span>Tax (8%):</span>
                                            <span>{formatPrice(cart.total * 0.08)}</span>
                                        </div>
                                        <div className="border-t border-slate-600 pt-4">
                                            <div className="flex justify-between text-xl font-bold text-white">
                                                <span>Total:</span>
                                                <span>{formatPrice(cart.total + 10 + (cart.total * 0.08))}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="pt-4 space-y-2">
                                            <Link href="/orders/create" className="block">
                                                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                                    Proceed to Checkout
                                                </Button>
                                            </Link>
                                            <Link href="/products" className="block">
                                                <Button variant="outline" className="w-full">
                                                    Continue Shopping
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}