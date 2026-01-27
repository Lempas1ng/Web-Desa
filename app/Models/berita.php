<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    use HasFactory;

    protected $guarded = [];

    // Tambahkan 'gambar_url' ke dalam JSON response
    protected $appends = ['gambar_url'];

    // Accessor: Otomatis ubah path database jadi URL lengkap
    public function getGambarUrlAttribute()
    {
        if ($this->gambar) {
            return asset('storage/' . $this->gambar);
        }
        return 'https://via.placeholder.com/400x300?text=No+Image';
    }
}