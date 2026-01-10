<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    use HasFactory;

    // TAMBAHKAN BARIS INI (Biar bisa simpan data)
    protected $guarded = []; 
}