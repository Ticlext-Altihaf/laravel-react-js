<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeaveActivitiesModel extends Model
{
    protected $table = 'leave_activities';


    public function leaveRequest()
    {
        return $this->belongsTo(LeaveRequestsModel::class);
    }
}
