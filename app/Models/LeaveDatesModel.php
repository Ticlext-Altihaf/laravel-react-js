<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeaveDatesModel extends Model
{
    protected $table = 'leave_dates';

    public function leaveRequest()
    {
        return $this->belongsTo(LeaveRequestsModel::class);
    }
}
