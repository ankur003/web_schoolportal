package com.school.portal.specification;

import com.school.portal.domain.Attendance;
import com.school.portal.requests.AttendanceRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specification;
import javax.persistence.criteria.*;

public class AttendanceSpec {


    public static Specification<Attendance> getAttendanceSpecification(AttendanceRequest attendanceRequest){
        return (Root<Attendance> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Predicate predicate = cb.conjunction();

            // Join with user if filtering by userUuid
            if (attendanceRequest.getUserUuid() != null && !attendanceRequest.getUserUuid().isEmpty()) {
                Join<Object, Object> userJoin = root.join("user", JoinType.INNER);
                predicate = cb.and(predicate, cb.equal(userJoin.get("userUuid"), attendanceRequest.getUserUuid()));
            }

            // Filter by approval status
            if (attendanceRequest.getStatus() != null) {
                predicate = cb.and(predicate, cb.equal(root.get("approvalStatus"), attendanceRequest.getStatus()));
            }

            // Filter by attendance date
            if (attendanceRequest.getDate() != null) {
                predicate = cb.and(predicate, cb.equal(root.get("attendanceDate"), attendanceRequest.getDate()));
            }

            return predicate;
        };
    }
}
