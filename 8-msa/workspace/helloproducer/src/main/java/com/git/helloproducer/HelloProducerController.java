package com.git.helloproducer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloProducerController {

   private HelloProducerService service;

   @Autowired
   public HelloProducerController(HelloProducerService service) {
      this.service = service;
   }

   @PostMapping(value = "/send-message")
   public boolean sendMessage(@RequestBody String message) {
      System.out.println(message);
      service.sendOder(message.getBytes());
      return true;
   }

}
