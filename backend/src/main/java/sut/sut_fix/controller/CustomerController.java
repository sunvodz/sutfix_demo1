package sut.sut_fix.controller;

import sut.sut_fix.entity.*;
import sut.sut_fix.repository.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
class CustomerController {

    private final Logger log = LoggerFactory.getLogger(CustomerController.class);
    private CustomerRepository customerRepository;

    public CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @PutMapping("/customer/{id}")
    ResponseEntity<Customer> updateCustomer(@Valid @RequestBody Customer customer) {
        log.info("Request to update customer: {}", customer);
        Customer result = customerRepository.save(customer);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/customer")
    ResponseEntity<Customer> createCustomer(@Valid @RequestBody Customer customer) throws URISyntaxException {
        log.info("Request to create customer: {}", customer);
        Customer result = customerRepository.save(customer);
        return ResponseEntity.created(new URI("/api/customer/" + result.getCusId())).body(result);
    }

    // @GetMapping("/customer/{id}")
    // ResponseEntity<?> getGroup(@PathVariable Long id) {
    // Optional<Customer> customer = customerRepository.findById(id);
    // return customer.map(response -> ResponseEntity.ok().body(response))
    // .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    // }
}