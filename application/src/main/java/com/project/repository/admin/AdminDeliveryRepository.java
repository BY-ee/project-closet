package com.project.repository.admin;

import com.project.domain.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminDeliveryRepository extends JpaRepository<Delivery,Long> {

}
