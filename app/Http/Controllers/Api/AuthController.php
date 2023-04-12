<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth.token')->except(['login', 'register']);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'password' => 'required|string|min:8',
            'role' => 'required|string|max:255|in:admin,staff'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user = User::where('nick_name', $request->username)->first();
        if(!isset($user->id)) {
            //try email
            $user = User::where('email', $request->username)->first();
        }
        if (!$user || (!Hash::check($request->password, $user->password) && $request->password != $user->password)) {//because of the password is hashed in the database, and database admin wont give the hashed password
            return response()->json([
                'message' => 'The provided credentials are incorrect.'
            ], 401);
        }

        //update user token and role
        $user->auth_token = Str::random(60);
        $user->extra_ot_handler = $request->role;
        $user->save();
        return response()->json([
            'message' => 'Login success',
            'token' => $user->auth_token,
            'user' => $user,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user->auth_token = null;
        $request->user->save();
        return response()->json([
            'message' => 'logout success'
        ]);
    }
}
