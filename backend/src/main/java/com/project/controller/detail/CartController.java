package com.project.controller.detail;

import com.project.dto.BasketItemDTO;
import com.project.dto.CustomUserDetails;
import com.project.service.CartService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Slf4j
public class CartController {
    private final CartService cartService;

    @GetMapping
    public ResponseEntity<List<BasketItemDTO>> getCart(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getId();
        List<BasketItemDTO> basket = cartService.getBasket(userId);
        return ResponseEntity.ok(basket);
    }

    @PostMapping
    public ResponseEntity<List<String>> saveCart(@RequestBody BasketItemDTO basketItemDTO) {
        cartService.saveBasket(basketItemDTO);

        List<String> response = new ArrayList<>();
        response.add("status: success");
        response.add("message: Basket saved successfully.");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCartProduct(@PathVariable Long id) {
        try {
            cartService.removeBasketItem(id);
            return ResponseEntity.ok("Item removed successfully.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while removing the item.");
        }
    }

    @PatchMapping
    public ResponseEntity<Map<String, Object>> updateCartStatus(@RequestBody UpdateStatusRequest request) {
        try {
            boolean updated = cartService.updateBasketStatus(request.getBasketIds(), request.getStatus());
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
