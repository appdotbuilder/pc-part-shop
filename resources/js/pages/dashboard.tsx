import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AppShell>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-4">🏠 Dashboard</h1>
                        <p className="text-gray-400">Welcome back! Manage your orders and account</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Orders */}
                        <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    📦 My Orders
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    View your order history and track shipments
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href="/orders">
                                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                        View Orders
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Browse Products */}
                        <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    🛒 Shop Products
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    Browse our complete catalog of PC components
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href="/products">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                        Browse Products
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Cart */}
                        <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    🛍️ Shopping Cart
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    Review items in your cart and checkout
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href="/cart">
                                    <Button className="w-full bg-green-600 hover:bg-green-700">
                                        View Cart
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Account Settings */}
                        <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    ⚙️ Account Settings
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    Update your profile and preferences
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href="/settings/profile">
                                    <Button variant="outline" className="w-full">
                                        Manage Account
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Support */}
                        <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    💬 Help & Support
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    Get help with your orders or technical questions
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full" disabled>
                                    Contact Support
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <Card className="bg-slate-800/50 border-slate-700">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    📊 Quick Stats
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Total Orders:</span>
                                        <span className="text-white">-</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Total Spent:</span>
                                        <span className="text-white">-</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Member Since:</span>
                                        <span className="text-white">-</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}