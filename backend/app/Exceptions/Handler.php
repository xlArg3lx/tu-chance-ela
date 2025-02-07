<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Database\QueryException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\JWTException;

class Handler extends ExceptionHandler
{
   public function register(): void
   {
       $this->renderable(function (QueryException $e) {
           return response()->json([
               'status' => 'error',
               'message' => 'Database error occurred',
               'error' => $e->getMessage()
           ], 500);
       });

       $this->renderable(function (TokenInvalidException $e) {
           return response()->json([
               'status' => 'error',
               'message' => 'Invalid token'
           ], 401);
       });

       $this->renderable(function (TokenExpiredException $e) {
           return response()->json([
               'status' => 'error',
               'message' => 'Token has expired'
           ], 401);
       });

       $this->renderable(function (JWTException $e) {
           return response()->json([
               'status' => 'error',
               'message' => 'Token not provided'
           ], 401);
       });
   }
}