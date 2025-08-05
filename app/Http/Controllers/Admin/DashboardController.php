<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware(function ($request, $next) {
            if (!auth()->user() || !auth()->user()->isAdmin()) {
                abort(403);
            }
            return $next($request);
        });
    }

    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        $stats = [
            'total_orders' => Order::count(),
            'total_products' => Product::count(),
            'total_customers' => User::where('role', 'customer')->count(),
            'recent_orders' => Order::with('user')->latest()->limit(5)->get(),
            'low_stock_products' => Product::where('manage_stock', true)
                ->where('stock_quantity', '<=', 10)
                ->limit(5)
                ->get(),
        ];
        
        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
        ]);
    }
}