<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // Pakai updateOrCreate supaya tidak error kalau dijalankan berkali-kali
        User::updateOrCreate(
            ['email' => 'admin@sukajayalempasing.com'], // Cek email ini
            [
                'name'     => 'Admin Desa',
                'password' => Hash::make('SukajayaMaju123'), // Password di-enkripsi
                // 'role'  => 'admin', // Hapus tanda // jika kamu punya kolom role
            ]
        );
    }
}