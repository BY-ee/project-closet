package com.project.controller;

import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.dto.ItemAllDTO;
import com.project.dto.ItemDetailItemDTO;
import com.project.service.ItemService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class ProductController {
    private final ItemService itemService; // final 키워드 추가

    @GetMapping("/products")
    public List<ItemAllDTO> getAllItems() {
        return itemService.getAllItems(); // DB 데이터 불러오는 함수
    }


    @GetMapping("/products/{itemDetailId}")
    public List<ItemDetailItemDTO> getItemDetail(@PathVariable Long itemDetailId) {
        return itemService.getItemsByItemDetailId(itemDetailId);
    }

    // 상위 3개의 아이템을 category(조회수, 좋아요 순위 등)로 조회하는 메서드
    @GetMapping("/products/top")
    public ResponseEntity<List<ItemAllDTO>> getTop3ItemsByCategory(@RequestParam String filter,
                                                                   @RequestParam String range) {
        log.info("filter: {}", filter);
        log.info("range: {}", range);
        return ResponseEntity.ok(itemService.getTop3ItemsByCategory(filter));
    }
}