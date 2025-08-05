import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface OrderItem {
    id: number;
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    product: {
        slug: string;
    };
}

interface Order {
    id: number;
    order_number: string;
    status: string;
    total_amount: number;
    created_at: string;
    items: OrderItem[];
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedOrders {
    data: Order[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Props {
    orders: PaginatedOrders;
    [key: string]: unknown;
}

export default function OrdersIndex({ orders }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-600';
            case 'processing':
                return 'bg-blue-600';
            case 'shipped':
                return 'bg-purple-600';
            case 'delivered':
                return 'bg-green-600';
            case 'cancelled':
                return 'bg-red-600';
            default:
                return 'bg-gray-600';
        }
    };

    if (orders.data.length === 0) {
        return (
            <AppShell>
                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-white mb-4">📦 My Orders</h1>
                        </div>

                        <Card className="bg-slate-800/50 border-slate-700 text-center py-12">
                            <CardContent>
                                <div className="text-6xl mb-4">📦</div>
                                <h2 className="text-2xl font-bold text-white mb-4">No orders yet</h2>
                                <p className="text-gray-400 mb-6">Start shopping to see your orders here!</p>
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
                        <h1 className="text-3xl font-bold text-white mb-4">📦 My Orders</h1>
                        <p className="text-gray-400">Track your purchases and order history</p>
                    </div>

                    <div className="space-y-6">
                        {orders.data.map((order) => (
                            <Card key={order.id} className="bg-slate-800/50 border-slate-700">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-white mb-2">
                                                Order #{order.order_number}
                                            </CardTitle>
                                            <p className="text-gray-400 text-sm">
                                                Placed on {formatDate(order.created_at)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <Badge className={`${getStatusColor(order.status)} text-white mb-2`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </Badge>
                                            <p className="text-xl font-bold text-white">
                                                {formatPrice(order.total_amount)}
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between py-2 border-b border-slate-600 last:border-b-0">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                                                        <span className="text-lg">🖥️</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium">
                                                            {item.product_name}
                                                        </p>
                                                        <p className="text-gray-400 text-sm">
                                                            Qty: {item.quantity} × {formatPrice(item.unit_price)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="text-white font-medium">
                                                    {formatPrice(item.total_price)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="mt-4 flex justify-end">
                                        <Link href={`/orders/${order.id}`}>
                                            <Button variant="outline" size="sm">
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    {orders.last_page > 1 && (
                        <div className="flex justify-center mt-8">
                            <nav className="flex space-x-2">
                                {orders.links.map((link, index) => (
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