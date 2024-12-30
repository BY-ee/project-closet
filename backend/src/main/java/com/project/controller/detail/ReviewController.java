package com.project.controller.detail;

import com.project.dto.ReviewDTO;
import com.project.dto.UserItemReviewDTO;
import com.project.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@Slf4j
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/products/{productId}")
    public List<UserItemReviewDTO> findReview(@PathVariable("productId") Long productId) {
        return reviewService.findAllReviews(productId);
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> saveReview(@RequestBody ReviewDTO review) {
        Map<String, String> response = new HashMap<>();
        try {
            reviewService.saveReview(review); // 데이터 저장
            response.put("message", "Review saved successfully.");
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            response.put("message", "Duplicate review: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        } catch (Exception e) {
            response.put("message", " " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/countReview/{itemId}")
    public Long countReview(@PathVariable("itemId") Long itemId) {return reviewService.getReviewCountByItemId(itemId);}

    @PutMapping("/{id}")
    public ResponseEntity<String> updateReview(@PathVariable Long id, @RequestBody ReviewDTO reviewDTO) {
        reviewService.updateReview(id, reviewDTO);
        return ResponseEntity.ok("Review updated successfully");
    }

    @PatchMapping("/{id}/inactivation")
    public ResponseEntity<String> inactivateReview(@PathVariable Long id) {
        reviewService.inactivateReview(id);
        return ResponseEntity.ok("리뷰 비활성화가 완료 되었습니다");
    }

    @PatchMapping("/{id}/activation")
    public ResponseEntity<String> activateReview(@PathVariable Long id) {
        reviewService.activateReview(id);
        return ResponseEntity.ok("리뷰 활성화가 완료 되었습니다");
    }

}
