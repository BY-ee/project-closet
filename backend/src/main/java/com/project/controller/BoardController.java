package com.project.controller;

import com.project.domain.Board;
import com.project.dto.BoardDTO;
import com.project.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    // 게시글 조회
    @GetMapping
    public ResponseEntity<List<BoardDTO>> getBoards(
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "condition", required = false) String condition) {
        if (keyword == null && condition == null) {
            List<BoardDTO> boards = boardService.getAllBoardsWithNickname();
            return ResponseEntity.ok(boards);
        }
        List<BoardDTO> boards = boardService.searchBoards(keyword, condition);
        return ResponseEntity.ok(boards);
    }

    // 게시글 상세 조회
    @GetMapping("/{boardId}")
    public ResponseEntity<BoardDTO> getBoardDetail(@PathVariable Long boardId) {
        BoardDTO boardDetail = boardService.getBoardDetailWithNickname(boardId);
        return ResponseEntity.ok(boardDetail);
    }

    // 게시글 작성
    @PostMapping("/write")
    public ResponseEntity<BoardDTO> createBoard(@RequestBody BoardDTO boardDTO) {
        BoardDTO createdBoardDTO = boardService.createBoard(boardDTO);
        return ResponseEntity.ok(createdBoardDTO);
    }

    // 글수정
    @PutMapping("/{boardId}")
    public ResponseEntity<BoardDTO> updateBoard(@PathVariable Long boardId, @RequestBody BoardDTO boardDTO) {
        boardDTO.setId(boardId); // boardId를 DTO에 설정
        BoardDTO updatedBoard = boardService.updateBoard(boardDTO); // 서비스 호출
        return ResponseEntity.ok(updatedBoard);
    }



    // 글삭제
    @DeleteMapping("/{boardId}")
    public ResponseEntity<String> deleteBoard(@PathVariable Long boardId) {
        boardService.deleteBoard(boardId);
        return ResponseEntity.ok("삭제 성공");
    }

}
