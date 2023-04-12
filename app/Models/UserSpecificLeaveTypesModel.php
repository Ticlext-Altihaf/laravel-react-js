<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSpecificLeaveTypesModel extends Model
{
    protected $table = 'user_specific_leave_types';


    public function leaveType()
    {
        return $this->belongsTo(LeaveTypesModel::class);
    }
}
