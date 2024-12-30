package com.project.controller;

import com.project.dto.CustomUserDetails;
import com.project.dto.PointDTO;
import com.project.service.PointService;
import com.project.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/points")
@RequiredArgsConstructor
public class PointController {

    private final PointService pointService;

    @GetMapping
    public ResponseEntity<Page<PointDTO>> getPointList(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        long userId = userDetails.getId();
        Pageable pageable = PageRequest.of(page, size); // 페이지 번호와 크기 설정
        Page<PointDTO> points = pointService.findPointListByUserId(userId, pageable);
        return ResponseEntity.ok(points);
    }

    @GetMapping("/total")
    public int getTotalPointByUserId(@AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            long userId = userDetails.getId();
            return pointService.getTotalPointByUserId(userId);
        } catch (Exception e) {
            log.error("예외 발생: {}", e.getMessage());
            throw new RuntimeException("An unexpected error occurred while processing the request", e);
        }
    }

    @PostMapping
    public ResponseEntity<String> savePoint(@RequestBody PointDTO point) {
        pointService.save(point);
        return ResponseEntity.ok("success");
    }
}
