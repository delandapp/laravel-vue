<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::latest()->get();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $request['password'] = bcrypt($request->password);
        $user = User::create($request->all());
        return response()->json($user);
    }
}
