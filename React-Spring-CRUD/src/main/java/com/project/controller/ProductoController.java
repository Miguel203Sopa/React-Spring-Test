package com.project.controller;

import com.project.entity.Producto;
import com.project.service.ProductoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins= "http://localhost:5173")
public class ProductoController {

    private ProductoService productoService;


    //Lo que se hace con estas etiquetas es que
    //cuando llegue una petición GET,POST,PUT,DELETE
    //Ejecute los metodos marcados con las etiquetas
    //de referencia

    //son mapeos de rutas HTTP

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping //HTTP -> GET -> Obtener información
    public ResponseEntity<List<Producto>> getAll() {
        return ResponseEntity.ok(productoService.listProduct());
    }

    @GetMapping("/{id}") //HTTP -> GET -> Obtener información
    public ResponseEntity<Producto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.searchById(id));
    }

    @PostMapping //HTTP -> POST -> Crear información
    public ResponseEntity<Producto> create(@RequestBody Producto producto) {
        Producto nuevo = productoService.save(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }

    @PutMapping("/{id}") //HTTP -> PUT -> Actualizar información
    public ResponseEntity<Producto> update(@PathVariable Long id, @RequestBody Producto producto) {
        return ResponseEntity.ok(productoService.update(id,producto));
    }

    @DeleteMapping("/{id}") //HTTP -> DELETE  -> Elimina información
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productoService.remove(id);
        return ResponseEntity.noContent().build();
    }
}
