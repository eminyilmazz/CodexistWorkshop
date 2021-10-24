package com.example.demo.Location;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    //@Query(value = "SELECT l from locations l WHERE l.longitude = :longitude AND l.latitude = :latitude ", nativeQuery = true)
    //Optional<Location> findByCoordinates(double longitude, double latitude);


    Optional<Location> findByLongitudeAndLatitude(double longitude, double latitude);
}
