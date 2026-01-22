<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Panggil AdminSeeder yang barusan kita buat
        $this->call(AdminSeeder::class);
    }
}