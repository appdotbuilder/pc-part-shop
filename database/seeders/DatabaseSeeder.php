<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@pcparts.com',
            'role' => 'admin',
        ]);

        // Create test customer
        User::factory()->create([
            'name' => 'John Customer',
            'email' => 'customer@example.com',
            'role' => 'customer',
        ]);

        // Create additional customers
        User::factory(10)->create(['role' => 'customer']);

        // Create categories
        $categories = [
            [
                'name' => 'Graphics Cards',
                'slug' => 'graphics-cards',
                'description' => 'High-performance GPUs for gaming and professional work',
                'sort_order' => 1,
            ],
            [
                'name' => 'Processors',
                'slug' => 'processors',
                'description' => 'CPUs from Intel and AMD',
                'sort_order' => 2,
            ],
            [
                'name' => 'Motherboards',
                'slug' => 'motherboards',
                'description' => 'Motherboards for various CPU sockets',
                'sort_order' => 3,
            ],
            [
                'name' => 'Memory (RAM)',
                'slug' => 'memory-ram',
                'description' => 'System memory for optimal performance',
                'sort_order' => 4,
            ],
            [
                'name' => 'Storage (SSD/HDD)',
                'slug' => 'storage',
                'description' => 'SSDs and HDDs for data storage',
                'sort_order' => 5,
            ],
            [
                'name' => 'Power Supplies',
                'slug' => 'power-supplies',
                'description' => 'Reliable PSUs for stable power delivery',
                'sort_order' => 6,
            ],
        ];

        foreach ($categories as $categoryData) {
            $category = Category::create($categoryData);
            
            // Create products for each category
            Product::factory(random_int(5, 10))->create([
                'category_id' => $category->id,
            ]);
        }

        // Set some products as featured
        Product::inRandomOrder()->limit(8)->update(['is_featured' => true]);
    }
}