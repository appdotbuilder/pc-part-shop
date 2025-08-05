<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user() && auth()->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string|max:500',
            'sku' => 'required|string|max:100|unique:products,sku',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0|lt:price',
            'brand' => 'required|string|max:255',
            'images' => 'nullable|array',
            'images.*' => 'string',
            'specifications' => 'nullable|array',
            'stock_quantity' => 'required|integer|min:0',
            'manage_stock' => 'boolean',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'category_id' => 'required|exists:categories,id',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Product name is required.',
            'sku.required' => 'SKU is required.',
            'sku.unique' => 'This SKU is already in use.',
            'price.required' => 'Price is required.',
            'price.min' => 'Price must be at least $0.00.',
            'sale_price.lt' => 'Sale price must be less than regular price.',
            'brand.required' => 'Brand is required.',
            'category_id.required' => 'Category is required.',
            'category_id.exists' => 'Selected category does not exist.',
        ];
    }
}