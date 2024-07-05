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
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);
        $request['password'] = bcrypt($request->password);
        $user = User::create($request->all());
        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if ($request->email != $user->email) {
            $request->validate([
                'email' => 'required|email|unique:users,email',
            ]);
        }
        if ($request->password) {
            $request['password'] = bcrypt($request->password);
        } else {
            unset($request['password']);
        }
        $user->update($request->all());
        return response()->json($user);
    }
}
