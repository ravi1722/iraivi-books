<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {

//     // return Inertia::render('Welcome', [
//     //     'canLogin' => Route::has('login'),
//     //     'canRegister' => Route::has('register'),
//     //     'laravelVersion' => Application::VERSION,
//     //     'phpVersion' => PHP_VERSION,
//     // ]);
// });

Route::get('/', [WelcomeController::class, 'index'])->name('index');
Route::post('/getwelcome', [WelcomeController::class, 'getall'])->name('welcome.getall');
Route::get('/books/details/{postid?}', [WelcomeController::class, 'details'])->name('welcome.details');
Route::post('/cart', [WelcomeController::class, 'cart'])->name('welcome.cart');
Route::get('/authors', [WelcomeController::class, 'authors'])->name('welcome.authors');
Route::get('/wishlist', [WelcomeController::class, 'wishlist'])->name('welcome.wishlist');
Route::get('/publishers', [WelcomeController::class, 'publishers'])->name('welcome.publishers');
Route::get('/allbooks/{type?}/{value?}', [WelcomeController::class, 'allbooks'])->name('welcome.allbooks');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::group(['prefix' => 'admin', 'middleware' => ['auth', 'verified']], function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/posts', [AdminController::class, 'posts'])->name('admin.posts');
    Route::get('/categories', [AdminController::class, 'categories'])->name('admin.categories');
    Route::get('/addpost/{postid?}', [AdminController::class, 'addpost'])->name('admin.addpost');
    Route::post('/saveposts', [AdminController::class, 'saveposts'])->name('admin.saveposts');
    Route::post('/savesinglepost', [AdminController::class, 'savesinglepost'])->name('admin.savesinglepost');
    Route::post('/getdata', [AdminController::class, 'getData'])->name('admin.getdata');
});

require __DIR__.'/auth.php';
