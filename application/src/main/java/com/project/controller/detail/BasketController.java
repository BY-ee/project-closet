package com.project.controller.detail;

import com.project.dto.BasketItemDTO;
import com.project.dto.ItemInquiryDTO;
import com.project.service.BasketService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

import java.util.*;

@RestController
@RequestMapping("/api/basket")
@RequiredArgsConstructor // 생성자
public class BasketController {

    private final BasketService basketService;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/saveBasket")
    public ResponseEntity<List<String>> saveBasket(@RequestBody BasketItemDTO basketItemDTO) {
        basketService.saveBasket(basketItemDTO);

        List<String> response = new ArrayList<>();
        response.add("status: success");
        response.add("message: Basket saved successfully.");
        return ResponseEntity.ok(response);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/getBasket/{userId}")
    public ResponseEntity<List<BasketItemDTO>> getBasket(@PathVariable("userId") Long userId) {
        List<BasketItemDTO> basket = basketService.getBasket(userId);
        return ResponseEntity.ok(basket);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> removeBasketItem(@PathVariable Long id) {
        try {
            basketService.removeBasketItem(id);
            return ResponseEntity.ok("Item removed successfully.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while removing the item.");
        }
    }

    @PatchMapping("/updateStatus")
    public ResponseEntity<Map<String, Object>> updateBasketStatus(@RequestBody UpdateStatusRequest request) {
        try {
            boolean updated = basketService.updateBasketStatus(request.getBasketIds(), request.getStatus());
            if (updated) {
                return ResponseEntity.ok(Map.of("success", true, "message", "Basket status updated successfully."));
            } else {
                return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Failed to update basket status."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Server error occurred."));
        }
    }

    @Data
    static class UpdateStatusRequest {
        private List<Long> basketIds;
        private String status;
    }
}
