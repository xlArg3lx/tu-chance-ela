<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class JwtMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        try {
            // Verificar si existe el token
            if (!$request->bearerToken()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token de autorización no proporcionado'
                ], 401);
            }

            // Intentar autenticar el token
            $user = JWTAuth::parseToken()->authenticate();

            // Si no hay usuario, el token es inválido
            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Usuario no autorizado'
                ], 401);
            }

            // Agregar el usuario autenticado a la solicitud
            $request->merge(['user' => $user]);

            return $next($request);

        } catch (TokenExpiredException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token expirado',
                'error' => $e->getMessage()
            ], 401);

        } catch (TokenInvalidException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token inválido',
                'error' => $e->getMessage()
            ], 401);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error de autorización',
                'error' => $e->getMessage()
            ], 401);
        }
    }
}
