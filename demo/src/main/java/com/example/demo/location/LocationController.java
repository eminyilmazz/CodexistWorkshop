package com.example.demo.Location;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/")
public class LocationController {
    @Autowired
    private LocationRepository locationRepository;

    @GetMapping("/locations")
    public List<Location> getAllLocations() {
        System.out.println("Here2");
        return locationRepository.findAll(); }

    @GetMapping("/locations/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable(value = "id") Long locationId)
        throws Exception {
        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new Exception ("Location " + locationId + " not found"));
        return ResponseEntity.ok().body(location);
    }
    @GetMapping("/coordinates")
    public ResponseEntity<Location> getLocationByCoordinates(@RequestParam(name = "longitude") double longitude, @RequestParam(name = "latitude") double latitude)
            throws Exception {
        System.out.println("Here");
        Location location = locationRepository.findByLongitudeAndLatitude(longitude, latitude)
                .orElseThrow(() -> new Exception ("Longitude: " + longitude + "\t Latitude: " + latitude + " not found."));
        return ResponseEntity.ok().body(location);
    }
    /*@GetMapping("/locations?{longitude}&{latitude}")
    public ResponseEntity<Location> getLocationByCoordinates(@PathVariable(value = "longitude") double longitude, @PathVariable(value = "latitude") double latitude)
            throws Exception {
        Location location = locationRepository.findByCoordinates(longitude, latitude)
                .orElseThrow(() -> new Exception ("Longitude: " + longitude + "\t Latitude: " + latitude + " not found."));
        return ResponseEntity.ok().body(location);
    }*/
    @PostMapping("/locations")
    public Location createLocation(@RequestBody Location location) { return locationRepository.save(location);}
}
