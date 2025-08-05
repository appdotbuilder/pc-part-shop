<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display the shopping cart.
     */
    public function index()
    {
        $cart = $this->getOrCreateCart();
        $cart->load(['items.product.category']);
        
        return Inertia::render('cart/index', [
            'cart' => $cart,
        ]);
    }

    /**
     * Add a product to the cart.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);
        
        $product = Product::findOrFail($request->input('product_id'));
        
        if (!$product->is_active || !$product->isInStock()) {
            return back()->with('error', 'Product is not available.');
        }
        
        $cart = $this->getOrCreateCart();
        
        $cartItem = $cart->items()->where('product_id', $product->id)->first();
        
        if ($cartItem) {
            $cartItem->increment('quantity', $request->input('quantity'));
        } else {
            CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $product->id,
                'quantity' => $request->input('quantity'),
                'price' => $product->effective_price,
            ]);
        }
        
        return back()->with('success', 'Product added to cart.');
    }

    /**
     * Update the specified cart item.
     */
    public function update(Request $request, CartItem $cartItem)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);
        
        $cart = $this->getOrCreateCart();
        
        if ($cartItem->cart_id !== $cart->id) {
            return back()->with('error', 'Cart item not found.');
        }
        
        $cartItem->update([
            'quantity' => $request->input('quantity'),
        ]);
        
        return back()->with('success', 'Cart updated.');
    }

    /**
     * Remove the specified cart item.
     */
    public function destroy(CartItem $cartItem)
    {
        $cart = $this->getOrCreateCart();
        
        if ($cartItem->cart_id !== $cart->id) {
            return back()->with('error', 'Cart item not found.');
        }
        
        $cartItem->delete();
        
        return back()->with('success', 'Item removed from cart.');
    }

    /**
     * Get or create a cart for the current user/session.
     */
    protected function getOrCreateCart(): Cart
    {
        if (Auth::check()) {
            return Cart::firstOrCreate(['user_id' => Auth::id()]);
        }
        
        $sessionId = session()->getId();
        return Cart::firstOrCreate(['session_id' => $sessionId]);
    }
}