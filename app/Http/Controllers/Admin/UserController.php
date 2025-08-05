<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
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
     * Display a listing of users.
     */
    public function index(Request $request)
    {
        $query = User::query();
        
        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }
        
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
        }
        
        $users = $query->latest()->paginate(15)->withQueryString();
        
        return Inertia::render('admin/users/index', [
            'users' => $users,
            'filters' => $request->only(['role', 'search']),
        ]);
    }

    /**
     * Display the specified user.
     */
    public function show(User $user)
    {
        $user->load(['orders' => function ($query) {
            $query->latest()->limit(10);
        }]);
        
        return Inertia::render('admin/users/show', [
            'user' => $user,
        ]);
    }
}