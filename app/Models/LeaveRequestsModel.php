<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeaveRequestsModel extends Model
{
    protected $table = 'leave_requests';


    public function leaveType()
    {
        return $this->belongsTo(LeaveTypesModel::class, 'leave_type_id');
    }

    public function leaveActivities()
    {
        return $this->hasMany(LeaveActivitiesModel::class, 'leave_request_id');
    }

    public function leaveDates()
    {
        return $this->hasMany(LeaveDatesModel::class, 'leave_request_id');
    }
}
