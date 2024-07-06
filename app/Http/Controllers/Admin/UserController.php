<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // $users = User::paginate(2)->map(function ($user) {
        //     return [
        //         'id' => $user->id,
        //         'name' => $user->name,
        //         'email' => $user->email,
        //         'created_at' => $user->created_at->format('d-m-Y'),
        //         'role' => $user->role,
        //     ];
        // });
        $users = User::latest()->paginate(5);

        return response()->json($users);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $user = User::where('name', 'like', '%' . $query . '%')->orWhere('email', 'like', '%' . $query . '%')->paginate(5);
        return response()->json($user);
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

    public function updateRole(Request $request, $id)
    {
        $user = User::find($id);
        $user->update(['role' => $request->role]);
        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json($user);
    }
}
