<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->randomElement([
            'NVIDIA GeForce RTX 4090',
            'AMD Ryzen 9 7950X',
            'Intel Core i9-13900K',
            'ASUS ROG Strix B650E-E',
            'Corsair Vengeance RGB 32GB',
            'Samsung 980 PRO 2TB',
            'Corsair RM850x',
            'NZXT Kraken X73',
            'Fractal Design Define 7',
        ]);

        $price = fake()->randomFloat(2, 99.99, 1999.99);
        $salePrice = fake()->boolean(30) ? fake()->randomFloat(2, 50, $price - 10) : null;

        return [
            'name' => $name,
            'slug' => Str::slug($name) . '-' . fake()->unique()->randomNumber(3),
            'description' => fake()->paragraph(3),
            'short_description' => fake()->sentence(),
            'sku' => fake()->unique()->regexify('[A-Z]{3}[0-9]{6}'),
            'price' => $price,
            'sale_price' => $salePrice,
            'brand' => fake()->randomElement(['NVIDIA', 'AMD', 'Intel', 'ASUS', 'Corsair', 'Samsung', 'NZXT', 'Fractal Design']),
            'images' => [
                '/images/products/placeholder-1.jpg',
                '/images/products/placeholder-2.jpg',
            ],
            'specifications' => [
                'Model' => fake()->bothify('Model-###'),
                'Warranty' => fake()->randomElement(['1 Year', '2 Years', '3 Years']),
                'Weight' => fake()->randomFloat(2, 0.5, 5.0) . ' kg',
            ],
            'stock_quantity' => fake()->numberBetween(0, 100),
            'manage_stock' => true,
            'is_active' => true,
            'is_featured' => fake()->boolean(20),
            'category_id' => Category::factory(),
        ];
    }
}