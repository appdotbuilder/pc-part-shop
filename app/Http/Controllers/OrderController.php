<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the user's orders.
     */
    public function index()
    {
        $orders = Auth::user()->orders()
            ->with('items.product')
            ->latest()
            ->paginate(10);
        
        return Inertia::render('orders/index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Show the order checkout form.
     */
    public function create()
    {
        $cart = Cart::where('user_id', Auth::id())->with('items.product')->first();
        
        if (!$cart || $cart->items->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }
        
        return Inertia::render('orders/create', [
            'cart' => $cart,
        ]);
    }

    /**
     * Store a newly created order.
     */
    public function store(Request $request)
    {
        $request->validate([
            'billing_address.name' => 'required|string|max:255',
            'billing_address.email' => 'required|email',
            'billing_address.phone' => 'required|string|max:20',
            'billing_address.address' => 'required|string',
            'billing_address.city' => 'required|string|max:255',
            'billing_address.state' => 'required|string|max:255',
            'billing_address.zip' => 'required|string|max:10',
            'shipping_address.name' => 'required|string|max:255',
            'shipping_address.address' => 'required|string',
            'shipping_address.city' => 'required|string|max:255',
            'shipping_address.state' => 'required|string|max:255',
            'shipping_address.zip' => 'required|string|max:10',
        ]);
        
        $cart = Cart::where('user_id', Auth::id())->with('items.product')->first();
        
        if (!$cart || $cart->items->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }
        
        DB::transaction(function () use ($request, $cart) {
            $subtotal = $cart->total;
            $taxAmount = $subtotal * 0.08; // 8% tax
            $shippingAmount = 10.00; // Flat shipping rate
            $totalAmount = $subtotal + $taxAmount + $shippingAmount;
            
            $order = Order::create([
                'order_number' => 'ORD-' . strtoupper(Str::random(8)),
                'user_id' => Auth::id(),
                'status' => 'pending',
                'subtotal' => $subtotal,
                'tax_amount' => $taxAmount,
                'shipping_amount' => $shippingAmount,
                'total_amount' => $totalAmount,
                'billing_address' => $request->billing_address,
                'shipping_address' => $request->shipping_address,
            ]);
            
            foreach ($cart->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'product_name' => $item->product->name,
                    'product_sku' => $item->product->sku,
                    'quantity' => $item->quantity,
                    'unit_price' => $item->price,
                    'total_price' => $item->quantity * $item->price,
                ]);
                
                // Update product stock
                if ($item->product->manage_stock) {
                    $item->product->decrement('stock_quantity', $item->quantity);
                }
            }
            
            // Clear the cart
            $cart->items()->delete();
            $cart->delete();
        });
        
        return redirect()->route('orders.index')->with('success', 'Order placed successfully!');
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order)
    {
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }
        
        $order->load('items.product');
        
        return Inertia::render('orders/show', [
            'order' => $order,
        ]);
    }
}