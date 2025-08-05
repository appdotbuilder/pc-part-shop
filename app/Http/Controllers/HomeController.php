<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with featured products and categories.
     */
    public function index()
    {
        $featuredProducts = Product::with('category')
            ->active()
            ->featured()
            ->inStock()
            ->limit(8)
            ->get();

        $categories = Category::active()
            ->orderBy('sort_order')
            ->limit(6)
            ->get();

        return Inertia::render('welcome', [
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
        ]);
    }
}