package com.git.helloclient.configuration.copy;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
	// CORS(cross origin resource sharing)을 설정
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
        	.addMapping("/**")
        	.allowedOrigins(
        			"http://localhost:3000", 
        			"http://ec2-52-79-178-68.ap-northeast-2.compute.amazonaws.com")
        	.allowedMethods("*");
    }
}
