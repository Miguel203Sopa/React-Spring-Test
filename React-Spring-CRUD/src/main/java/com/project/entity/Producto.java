package com.project.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "PRODUCT")
@Getter
@Setter
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private long id;

    @Column(name = "NAME", nullable = false, length= 50)
    private String name;

    @Column(name="PRICE", nullable = false)
    private BigDecimal price;

    @Column(name="CREATED_AT", nullable=false)
    private Date createdAt;

    //updatedAt es null porque es un dato que solo se actualiza si se cambian los registros
    @Column(name="UPDATED_AT", nullable = true)
    private Date updatedAt;


}
