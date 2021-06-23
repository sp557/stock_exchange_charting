package com.siddhartha.SocGenPhase3;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WelcomePage {

     @RequestMapping("/welcome")
     public String home(){
         return "Hello World!";
     }
 }