<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiResponseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Modificar la estructura de la respuesta JSON
        $content = json_decode($response->getContent(), true);

        $modifiedResponse = [
            'result' => [
                'code' => $response->getStatusCode(),
                'status' => $response->isSuccessful() ? 'success' : 'error',
                'result_message' => [
                    'value' => $response->getStatusCode() == 200 ? 'Request successful' : 'Request failed',
                ],
            ],
            $response->getStatusCode() == 200 ? 'data' : 'detail' => $content,
        ];

        $response->setContent(json_encode($modifiedResponse));

        return $response;
    }
}
