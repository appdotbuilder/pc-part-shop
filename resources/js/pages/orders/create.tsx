import React, { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { router } from '@inertiajs/react';

interface CartItem {
    id: number;
    quantity: number;
    price: number;
    subtotal: number;
    product: {
        name: string;
        brand: string;
    };
}

interface Cart {
    id: number;
    total: number;
    items: CartItem[];
}

interface Props {
    cart: Cart;
    [key: string]: unknown;
}

export default function OrderCreate({ cart }: Props) {
    const [billingAddress, setBillingAddress] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
    });

    const [shippingAddress, setShippingAddress] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
    });

    const [sameAsBilling, setSameAsBilling] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const finalShippingAddress = sameAsBilling ? {
            name: billingAddress.name,
            address: billingAddress.address,
            city: billingAddress.city,
            state: billingAddress.state,
            zip: billingAddress.zip,
        } : shippingAddress;

        router.post(route('orders.store'), {
            billing_address: billingAddress,
            shipping_address: finalShippingAddress,
        }, {
            onFinish: () => setIsSubmitting(false),
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    const subtotal = cart.total;
    const taxAmount = subtotal * 0.08;
    const shippingAmount = 10.00;
    const totalAmount = subtotal + taxAmount + shippingAmount;

    return (
        <AppShell>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-4">💳 Checkout</h1>
                        <p className="text-gray-400">Complete your order</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Billing & Shipping Forms */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Billing Address */}
                                <Card className="bg-slate-800/50 border-slate-700">
                                    <CardHeader>
                                        <CardTitle className="text-white">📍 Billing Address</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                                    Full Name *
                                                </label>
                                                <Input
                                                    required
                                                    value={billingAddress.name}
                                                    onChange={(e) => setBillingAddress({...billingAddress, name: e.target.value})}
                                                    className="bg-slate-700 border-slate-600 text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                                    Email *
                                                </label>
                                                <Input
                                                    type="email"
                                                    required
                                                    value={billingAddress.email}
                                                    onChange={(e) => setBillingAddress({...billingAddress, email: e.target.value})}
                                                    className="bg-slate-700 border-slate-600 text-white"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                                Phone *
                                            </label>
                                            <Input
                                                required
                                                value={billingAddress.phone}
                                                onChange={(e) => setBillingAddress({...billingAddress, phone: e.target.value})}
                                                className="bg-slate-700 border-slate-600 text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                                Address *
                                            </label>
                                            <Input
                                                required
                                                value={billingAddress.address}
                                                onChange={(e) => setBillingAddress({...billingAddress, address: e.target.value})}
                                                className="bg-slate-700 border-slate-600 text-white"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                                    City *
                                                </label>
                                                <Input
                                                    required
                                                    value={billingAddress.city}
                                                    onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                                                    className="bg-slate-700 border-slate-600 text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                                    State *
                                                </label>
                                                <Input
                                                    required
                                                    value={billingAddress.state}
                                                    onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})}
                                                    className="bg-slate-700 border-slate-600 text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                                    ZIP Code *
                                                </label>
                                                <Input
                                                    required
                                                    value={billingAddress.zip}
                                                    onChange={(e) => setBillingAddress({...billingAddress, zip: e.target.value})}
                                                    className="bg-slate-700 border-slate-600 text-white"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Shipping Address */}
                                <Card className="bg-slate-800/50 border-slate-700">
                                    <CardHeader>
                                        <CardTitle className="text-white">🚚 Shipping Address</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-4">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    checked={sameAsBilling}
                                                    onChange={(e) => setSameAsBilling(e.target.checked)}
                                                    className="rounded border-slate-600 bg-slate-700"
                                                />
                                                <span className="text-gray-300">Same as billing address</span>
                                            </label>
                                        </div>

                                        {!sameAsBilling && (
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                                        Full Name *
                                                    </label>
                                                    <Input
                                                        required
                                                        value={shippingAddress.name}
                                                        onChange={(e) => setShippingAddress({...shippingAddress, name: e.target.value})}
                                                        className="bg-slate-700 border-slate-600 text-white"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                                        Address *
                                                    </label>
                                                    <Input
                                                        required
                                                        value={shippingAddress.address}
                                                        onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                                                        className="bg-slate-700 border-slate-600 text-white"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                                            City *
                                                        </label>
                                                        <Input
                                                            required
                                                            value={shippingAddress.city}
                                                            onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                                                            className="bg-slate-700 border-slate-600 text-white"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                                            State *
                                                        </label>
                                                        <Input
                                                            required
                                                            value={shippingAddress.state}
                                                            onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                                                            className="bg-slate-700 border-slate-600 text-white"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                                            ZIP Code *
                                                        </label>
                                                        <Input
                                                            required
                                                            value={shippingAddress.zip}
                                                            onChange={(e) => setShippingAddress({...shippingAddress, zip: e.target.value})}
                                                            className="bg-slate-700 border-slate-600 text-white"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Order Summary */}
                            <div>
                                <Card className="bg-slate-800/50 border-slate-700 sticky top-8">
                                    <CardHeader>
                                        <CardTitle className="text-white">📋 Order Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4 mb-6">
                                            {cart.items.map((item) => (
                                                <div key={item.id} className="flex justify-between text-sm">
                                                    <div>
                                                        <p className="text-white">{item.product.name}</p>
                                                        <p className="text-gray-400">Qty: {item.quantity}</p>
                                                    </div>
                                                    <p className="text-white">{formatPrice(item.subtotal)}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="space-y-2 border-t border-slate-600 pt-4">
                                            <div className="flex justify-between text-gray-300">
                                                <span>Subtotal:</span>
                                                <span>{formatPrice(subtotal)}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-300">
                                                <span>Shipping:</span>
                                                <span>{formatPrice(shippingAmount)}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-300">
                                                <span>Tax (8%):</span>
                                                <span>{formatPrice(taxAmount)}</span>
                                            </div>
                                            <div className="flex justify-between text-xl font-bold text-white border-t border-slate-600 pt-2">
                                                <span>Total:</span>
                                                <span>{formatPrice(totalAmount)}</span>
                                            </div>
                                        </div>

                                        <div className="pt-6">
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-purple-600 hover:bg-purple-700"
                                            >
                                                {isSubmitting ? 'Processing...' : 'Place Order'}
                                            </Button>
                                            <p className="text-xs text-gray-500 mt-2 text-center">
                                                This is a demo checkout. No payment will be processed.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}