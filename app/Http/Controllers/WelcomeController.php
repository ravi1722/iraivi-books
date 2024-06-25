<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class WelcomeController extends Controller
{
    public function index()
    {
        $categories = DB::select("Select * from categories");
        return Inertia::render('Welcome', compact('categories'));
    }
    public function getall(Request $request)
    {
        if ($request->ajax()) {
            $mode = $request->mode;
            $result = [];
            if ($mode == 'getpostsbycategory') {
                $id = $request->id;

                $sSql = "Select a.categoryid,b.* from categorytrans a Left Join posts b on a.postid=b.postid where a.categoryid=" . $id;
                $result = DB::select($sSql);
            } elseif ($mode == 'getallcategory') {
                $sSql = "Select * from categories where active=0";
                $result = DB::select($sSql);
            } elseif ($mode == 'getposts') {

                $val = base64_decode($request->value);
                $type = $request->type;
                $page = $request->page;
                $price = $request->price;

                $posts = "Select a.postid,a.postname,a.url,a.price,a.originalprice,
                b.authorname from posts a Left Join authors b on a.authorid=b.authorid ";
                if ($type == 'search') {
                    $posts .= " where a.postname like '%" . $val . "%' OR b.authorname like '%" . $val . "%'";
                } elseif ($type == 'category') {
                    if ($val > 0) $posts .= "Left Join categorytrans c on a.postid = c.postid where c.categoryid =" . $val;
                } elseif ($type == 'author') {
                    $posts .= "where a.authorid =" . $val;
                } elseif ($type == 'publisher') {
                    $posts .= "Left Join publishers c on a.publisherid = c.publisherid where c.publisherid =" . $val;
                } else {
                    // no page found
                }

                if (count($price) > 0) {
                    if ($type == 'author' || $type == 'publisher' || $type == 'search' || ($type == 'category' && $val > 0)) $posts .= ' and ';
                    else $posts .= ' where ';
                    $posts .= " a.price >= " . isNullCheck($price[0], 'number') . " and a.price <= ".isNullCheck($price[1], 'number');
                }

                $count = DB::select($posts);
                $result['count'] = count($count);

                $posts .= "  order by a.createddate desc LIMIT " . $page . ",12";

                $result['page'] = DB::select($posts);
            }
            return response()->json($result, 200);
        }
    }
    public function allbooks($type = '', $value = '')
    {
        $data['categories'] = DB::select("Select * From categories where active=0");
        $minPrice = DB::select("Select min(price) price From posts");
        $data['minPrice'] = $minPrice[0]->price;
        $maxPrice = DB::select("Select max(price) price From posts");
        $data['maxPrice'] = $maxPrice[0]->price;

        // if($type != 'search' && $type != 'category' && $type != 'author' && $type != 'publisher') return redirect('no page found');

        return Inertia::render('Welcome/AllBooks', compact('data', 'type', 'value'));
    }
    public function authors()
    {
        $authors = DB::select("Select * from authors");
        return Inertia::render('Welcome/Authors', compact('authors'));
    }
    public function publishers()
    {
        $publishers = DB::select("Select * from publishers");
        return Inertia::render('Welcome/Publishers', compact('publishers'));
    }
    public function cart(Request $request)
    {
        if ($request->ajax()) {
            $result = [];
            $sessionid = session()->getId();
            $mode = $request->mode;
            if ($mode == 'addcart') {
                $postid = $request->postid;
                $quantity = $request->quantity;

                if (!is_null($sessionid) && !empty($sessionid)) {

                    $sessions = DB::select("Select id from cart_session where sessionid ='" . $sessionid . "'");
                    if (count($sessions) > 0) {
                        $insertId = $sessions[0]->id;
                    } else {
                        $insertId = DB::table('cart_session')->insertGetId(
                            [
                                'sessionid' => $sessionid,
                            ]
                        );
                    }

                    DB::table('cart_trans')->insert(
                        [
                            'cartsessionid' => $insertId,
                            'postid' => $postid,
                            'quantity' => $quantity,
                            'updateddate' => date('Y-m-d H:i:s'),
                        ]
                    );
                }
                $result = DB::select("Select b.postid,b.quantity,c.postname,d.authorname,c.price,c.originalprice from cart_session a Left Join cart_trans b on a.id=b.cartsessionid Left Join posts c on b.postid=c.postid Left Join authors d on c.authorid=d.authorid where a.sessionid ='" . $sessionid . "' and b.postid is not null");
            }
            if ($mode == 'viewcart') {
                $result = DB::select("Select b.postid,b.quantity,c.postname,d.authorname,c.price,c.originalprice from cart_session a Left Join cart_trans b on a.id=b.cartsessionid Left Join posts c on b.postid=c.postid Left Join authors d on c.authorid=d.authorid where a.sessionid ='" . $sessionid . "' and b.postid is not null");
            }
            if ($mode == 'updatecart') {
                $postid = $request->postid;
                $quantity = $request->quantity;

                $sessions = DB::select("Select id from cart_session where sessionid ='" . $sessionid . "'");
                if (count($sessions) > 0) {
                    $insertId = $sessions[0]->id;


                    if ($quantity > 0) {
                        DB::table('cart_trans')->where('cartsessionid', $insertId)->where('postid', $postid)->update(array('quantity' => $quantity));
                    } else {
                        DB::table('cart_trans')->where('cartsessionid', $insertId)->where('postid', $postid)->delete();
                    }
                }
                $result = DB::select("Select b.postid,b.quantity,c.postname,d.authorname,c.price,c.originalprice from cart_session a Left Join cart_trans b on a.id=b.cartsessionid Left Join posts c on b.postid=c.postid Left Join authors d on c.authorid=d.authorid where a.sessionid ='" . $sessionid . "' and b.postid is not null");
            }
            return response()->json($result, 200);
        }
    }
    public function details($postid = '')
    {
        if (!empty($postid)) {
            $postid = base64_decode($postid);
            $sql = DB::select("Select a.postid,a.postname,a.url,a.price,a.originalprice,a.description,
            b.authorname,c.publishername from posts a Left Join authors b on a.authorid=b.authorid 
            Left Join publishers c on a.publisherid = c.publisherid where a.postid = " . $postid);
            $post = $sql[0];

            $images = DB::select("Select * from post_img_trans where postid=". $postid);
            return Inertia::render('Welcome/Details', compact('post','images'));
        }
        // else no page found
    }
    public function wishlist()
    {
        return Inertia::render('Welcome/Wishlist');
    }
}
