package com.example.demo.location;

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
    public List<Location> getAllLocations() { return locationRepository.findAll(); }

    @GetMapping("/locations/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable(value = "id") Long locationId)
        throws Exception {
        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new Exception ("Location " + locationId + " not found"));
        return ResponseEntity.ok().body(location);
    }
    @GetMapping("/locations/coordinates")
    public ResponseEntity<Location> getLocationByCoordinates(@RequestParam(value = "longitude") double longitude, @RequestParam(value = "latitude") double latitude)
            throws Exception {
        Location location = locationRepository.findByCoordinates(longitude, latitude)
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
