<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Filesystem\Filesystem;

function savepostdata($data)
{
    $name = isNullCheck(isset($data['name']) ? $data['name'] : '', 'string');
    $author = isNullCheck(isset($data['author']) ? $data['author'] : '', 'string');
    $publisher = isNullCheck(isset($data['publisher']) ? $data['publisher'] : '', 'string');
    $description = isNullCheck(isset($data['description']) ? $data['description'] : '', 'string');
    $isbn = isNullCheck(isset($data['isbn']) ? $data['isbn'] : '', 'string');
    $originalprice = isNullCheck(isset($data['original price']) ? $data['original price'] : '', 'number');
    $price = isNullCheck(isset($data['price']) ? $data['price'] : '', 'number');
    $pages = isNullCheck(isset($data['pages']) ? $data['pages'] : '', 'number');
    $publishedyear = isNullCheck(isset($data['published year']) ? $data['published year'] : '', 'number');
    $freeshipping = isNullCheck(isset($data['free shipping']) ? $data['free shipping'] : '', 'string');
    $instock = isNullCheck(isset($data['in stock']) ? $data['in stock'] : '', 'number');

    if ($freeshipping != '' && ($freeshipping == 'Yes' || $freeshipping == 'yes')) $freeship = 1;
    else $freeship = 0;

    DB::beginTransaction();
    try {
        $authorid = 0;
        if (!empty($author)) {
            $authors = DB::select("Select authorid From authors where authorname='" . $author . "'");
            if (count($authors) > 0) $authorid = $authors[0]->authorid;
            else {
                $authorid = DB::table('authors')->insertGetId([
                    'authorname' => $author,
                ]);
            }
        }

        $publisherid = 0;
        if (!empty($publisher)) {
            $publishers = DB::select("Select publisherid From publishers where publishername='" . $publisher . "'");
            if (count($publishers) > 0) $publisherid = $publishers[0]->publisherid;
            else {
                $publisherid = DB::table('publishers')->insertGetId([
                    'publishername' => $publisher,
                ]);
            }
        }

        $postid = DB::table('posts')->insertGetId([
            'postname' => $name,
            'description' => $description,
            'price' => $price,
            'originalprice' => $originalprice,
            'pages' => $pages,
            'authorid' => $authorid,
            'publisherid' => $publisherid,
            'isbn' => $isbn,
            'freeshipping' => $freeship,
            'publishedyear' => $publishedyear,
            'quantity' => $instock,
        ]);
        DB::commit();
    } catch (\Exception $err) {
        DB::rollback();
        dd($err);
    }
}
function emptyallvalues()
{
    $filesys = new Filesystem;
    $filesys->cleanDirectory(public_path() . '/posts');
    DB::table('authors')->truncate();
    DB::table('categories')->truncate();
    DB::table('cart_session')->truncate();
    DB::table('cart_trans')->truncate();
    DB::table('categorytrans')->truncate();
    DB::table('posts')->truncate();
    DB::table('post_img_trans')->truncate();
    DB::table('publishers')->truncate();
}
function isNullCheck($obj, $datatype)
{
    if ($datatype == 'number') {
        $obj = str_replace(',', '', $obj); // remove commas from value
        if (!isset($obj) || is_null($obj) || empty($obj) || is_numeric($obj) == false) {
            $value = 0;
        } else {
            $value = $obj;
        }
    } else if ($datatype == 'string') {
        if (!isset($obj) || is_null($obj) || empty($obj)) {
            $value = '';
        } else {
            $value = trim($obj);
        }
    } else if ($datatype == 'boolean') {
        if (!isset($obj) || is_null($obj) || empty($obj) || is_bool($obj) == false) {
            $value = false;
        } else {
            $value = $obj;
        }
    } else if ($datatype == 'date') {
        if (!isset($obj) || is_null($obj) || empty($obj)) {
            $value = date("d-m-Y");
        } else {
            $value = $obj;
        }
    }
    return $value;
}
