<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Filesystem\Filesystem;

class AdminController extends Controller
{
    public function getData(Request $request)
    {
        if ($request->ajax()) {
            $mode = $request->mode;
            $result = [];
            if ($mode == 'getAllPosts') {
                $startDate = $request->startDate;
                $endDate = $request->endDate;

                $startDate = date('Y-m-d', strtotime($startDate));
                $endDate = date('Y-m-d', strtotime($endDate)) . " 23:59:59";

                $result = DB::select("Select a.postid id,a.postname,a.url,price,a.originalprice,a.description,a.quantity,Case When a.deleteflag=0 then true else false end active,
                b.authorname,c.publishername,DATE_FORMAT(a.createddate, '%D %M %Y') createddate,Case when a.freeshipping=1 then 'Yes' else 'No' end freeshipping from posts a Left Join authors b on a.authorid=b.authorid 
                Left Join publishers c on a.publisherid = c.publisherid where a.createddate<= '" . $endDate . "' and a.createddate>= '" . $startDate . "'");
            }
            if ($mode == 'getCategoryPost') {
                $categoryid = isNullCheck($request->categoryid, 'number');
                $result = DB::select("Select postid from categorytrans where categoryid=" . $categoryid);
            }
            if ($mode == 'deleteCategory') {
                $categoryid = isNullCheck($request->categoryid, 'number');
                DB::table('categorytrans')->where('categoryid', $categoryid)->delete();
                DB::table('categories')->where('categoryid', $categoryid)->delete();
            }
            if ($mode == 'submitCategoryPost') {
                $categoryid = isNullCheck($request->categoryid, 'number');
                $active = isNullCheck($request->active, 'number');
                $categoryposts = $request->categoryposts;

                DB::table('categorytrans')->where('categoryid', $categoryid)->delete();
                foreach ($categoryposts as $postid) {
                    $id = DB::table('categorytrans')->insertGetId([
                        'categoryid' => $categoryid,
                        'postid' => $postid
                    ]);
                }
                DB::table('categories')->where('categoryid', $categoryid)->update(array('active' => $active));
            }
            if ($mode == 'addNewCategory') {
                $newcategoryname = isNullCheck($request->newcategoryname, 'string');
                $newactive = isNullCheck($request->newactive, 'number');
                $newcategoryposts = $request->newcategoryposts;

                $categoryid = DB::table('categories')->insertGetId([
                    'categoryname' => $newcategoryname,
                    'active' => $newactive
                ]);

                foreach ($newcategoryposts as $postid) {
                    $id = DB::table('categorytrans')->insertGetId([
                        'categoryid' => $categoryid,
                        'postid' => $postid
                    ]);
                }
            }
            return response()->json($result, 200);
        }
    }
    public function dashboard()
    {
        $data['posts'] = count(DB::select("Select postid From posts"));
        return Inertia::render('Admin/Dashboard', compact("data"));
    }
    public function posts()
    {
        // emptyallvalues();
        return Inertia::render('Admin/Posts/AllPosts');
    }
    public function addpost($postid = '')
    {
        $editdata = null;
        if(!empty($postid)){
            $postid = base64_decode($postid);
            $post = DB::select("Select a.postid id,a.postname name,price,a.originalprice,a.description,a.isbn,a.pages,a.publishedyear,a.quantity instock,
                b.authorname author,c.publishername publisher,Case when a.freeshipping=1 then 'On' else 'Off' end freeshipping from posts a Left Join authors b on a.authorid=b.authorid 
                Left Join publishers c on a.publisherid = c.publisherid where a.postid=".$postid);
            $editdata['post'] = $post[0];

            $images = DB::select("Select transid id,url src From post_img_trans where postid=".$postid);
            $editdata['images'] = count($images) > 0 ? $images : [];
        }
        return Inertia::render('Admin/Posts/AddPost', compact("editdata"));
    }
    public function savesinglepost(Request $request)
    {
        $name = isNullCheck($request->name, 'string');
        $author = isNullCheck($request->author, 'string');
        $publisher = isNullCheck($request->publisher, 'string');
        $description = isNullCheck($request->description, 'string');
        $isbn = isNullCheck($request->isbn, 'string');
        $originalprice = isNullCheck($request->originalprice, 'number');
        $price = isNullCheck($request->price, 'number');
        $pages = isNullCheck($request->pages, 'number');
        $publishedyear = isNullCheck($request->publishedyear, 'number');
        $freeshipping = isNullCheck($request->freeshipping, 'string');
        $instock = isNullCheck($request->instock, 'number');

        if ($freeshipping != '' && $freeshipping == 'on') $freeship = 1;
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

            $files = $request->file('uploadedImages');
            if(isset($files)){
                $filesys = new Filesystem;
                $filesys->cleanDirectory(public_path() . '/posts/' . $postid);
    
                DB::table('post_img_trans')->where('postid', $postid)->delete();
                foreach ($files as $file) {
    
                    $fileName = $file->getClientOriginalName();
                    if (!file_exists(public_path() . '/posts/' . $postid)) {
                        mkdir(public_path() . '/posts/' . $postid);
                    }
    
                    $file->move(public_path() . '/posts/' . $postid, $fileName);
                    $filepath = 'posts/' . $postid . '/' . $fileName;
    
                    DB::table('post_img_trans')->insert([
                        'postid' => $postid,
                        'url' => $filepath,
                        'imagename' => $fileName,
                    ]);
                }

                $imgs = DB::select("SELECT url FROM post_img_trans WHERE postid=". $postid ." ORDER BY transid LIMIT 1");
                $imgurl = $imgs[0]->url;
                DB::table('posts')->where('postid', $postid)->update(array('url' => $imgurl));
            }
            DB::commit();
        } catch (\Exception $err) {
            DB::rollback();
            dd($err);
        }

        return redirect('admin/posts');
    }
    public function saveposts(Request $request)
    {
        $posts = $request->all();
        foreach ($posts as $post) {
            savepostdata($post);
        }
        return redirect('admin/posts');
    }
    public function categories()
    {
        $categories = DB::select("Select categoryid,categoryname,active from categories");
        $posts = DB::select("Select postid,postname from posts");
        return Inertia::render('Admin/Posts/Categories', compact('categories', 'posts'));
    }
}
