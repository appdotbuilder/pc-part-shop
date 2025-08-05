<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 50, 1000);
        $taxAmount = $subtotal * 0.08;
        $shippingAmount = 10.00;
        $totalAmount = $subtotal + $taxAmount + $shippingAmount;

        return [
            'order_number' => 'ORD-' . strtoupper(Str::random(8)),
            'user_id' => User::factory(),
            'status' => fake()->randomElement(['pending', 'processing', 'shipped', 'delivered']),
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'shipping_amount' => $shippingAmount,
            'total_amount' => $totalAmount,
            'billing_address' => [
                'name' => fake()->name(),
                'email' => fake()->email(),
                'phone' => fake()->phoneNumber(),
                'address' => fake()->streetAddress(),
                'city' => fake()->city(),
                'state' => fake()->randomElement(['CA', 'NY', 'TX', 'FL', 'WA']),
                'zip' => fake()->postcode(),
            ],
            'shipping_address' => [
                'name' => fake()->name(),
                'address' => fake()->streetAddress(),
                'city' => fake()->city(),
                'state' => fake()->randomElement(['CA', 'NY', 'TX', 'FL', 'WA']),
                'zip' => fake()->postcode(),
            ],
        ];
    }
}