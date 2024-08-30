<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLeaderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $leaderId = $this->route('leader')->id;
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:leaders,email,' . $leaderId,
            'phoneNumber' => 'required|string|max:12',
            'role' => 'sometimes|string|max:50',
            'password' => 'sometimes|string|min:12',
        ];
    }
}
