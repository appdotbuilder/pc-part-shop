import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Order {
    id: number;
    order_number: string;
    status: string;
    total_amount: number;
    created_at: string;
    user: User;
}

interface Product {
    id: number;
    name: string;
    stock_quantity: number;
}

interface Stats {
    total_orders: number;
    total_products: number;
    total_customers: number;
    recent_orders: Order[];
    low_stock_products: Product[];
}

interface Props {
    stats: Stats;
    [key: string]: unknown;
}

export default function AdminDashboard({ stats }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
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

    return (
        <AppShell>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-4">👑 Admin Dashboard</h1>
                        <p className="text-gray-400">Manage your e-commerce platform</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card className="bg-slate-800/50 border-slate-700">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    📦 Total Orders
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-purple-400">{stats.total_orders}</p>
                                <p className="text-gray-400 text-sm">All time orders</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 border-slate-700">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    🛒 Total Products
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-blue-400">{stats.total_products}</p>
                                <p className="text-gray-400 text-sm">In catalog</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 border-slate-700">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    👥 Total Customers
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-green-400">{stats.total_customers}</p>
                                <p className="text-gray-400 text-sm">Registered users</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <Link href="/admin/products/create">
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                ➕ Add Product
                            </Button>
                        </Link>
                        <Link href="/admin/products">
                            <Button variant="outline" className="w-full">
                                📦 Manage Products
                            </Button>
                        </Link>
                        <Link href="/admin/orders">
                            <Button variant="outline" className="w-full">
                                📋 View Orders
                            </Button>
                        </Link>
                        <Link href="/admin/users">
                            <Button variant="outline" className="w-full">
                                👥 Manage Users
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recent Orders */}
                        <Card className="bg-slate-800/50 border-slate-700">
                            <CardHeader>
                                <CardTitle className="text-white">📋 Recent Orders</CardTitle>
                                <CardDescription className="text-gray-400">
                                    Latest orders from customers
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {stats.recent_orders.length > 0 ? (
                                    <div className="space-y-4">
                                        {stats.recent_orders.map((order) => (
                                            <div key={order.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                                                <div>
                                                    <p className="text-white font-medium">#{order.order_number}</p>
                                                    <p className="text-gray-400 text-sm">{order.user.name}</p>
                                                    <p className="text-gray-500 text-xs">{formatDate(order.created_at)}</p>
                                                </div>
                                                <div className="text-right">
                                                    <Badge className={`${getStatusColor(order.status)} text-white mb-1`}>
                                                        {order.status}
                                                    </Badge>
                                                    <p className="text-white font-medium">
                                                        {formatPrice(order.total_amount)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        <Link href="/admin/orders">
                                            <Button variant="outline" size="sm" className="w-full">
                                                View All Orders
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-center py-4">No orders yet</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Low Stock Products */}
                        <Card className="bg-slate-800/50 border-slate-700">
                            <CardHeader>
                                <CardTitle className="text-white">⚠️ Low Stock Alert</CardTitle>
                                <CardDescription className="text-gray-400">
                                    Products with low inventory
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {stats.low_stock_products.length > 0 ? (
                                    <div className="space-y-4">
                                        {stats.low_stock_products.map((product) => (
                                            <div key={product.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                                                <div>
                                                    <p className="text-white font-medium">{product.name}</p>
                                                </div>
                                                <div className="text-right">
                                                    <Badge variant="destructive">
                                                        {product.stock_quantity} left
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                        <Link href="/admin/products">
                                            <Button variant="outline" size="sm" className="w-full">
                                                Manage Inventory
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-center py-4">All products well stocked</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}