<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateToken
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Token not provided'], 401);
        }

        // Verify token and retrieve user object
        $user = User::where('auth_token', $token)->first();

        if (!$user) {
            return response()->json(['message' => 'Invalid token'], 401);
        }

        $request->merge(['user' => $user]);
        return $next($request);
    }
}
