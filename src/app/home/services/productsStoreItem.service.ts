import { StoreItem } from "../../shared/data/storeItem";
import { Product } from "../../shared/types/products.type";
import { ProductsService } from "./products.service";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ProductStoreItem extends StoreItem<Product[]>{
    private productsService = inject(ProductsService)
    constructor(){
        super([])
    }

    async loadProducts(query?: string) {
        this.productsService.getAllProducts(query).subscribe((products) => this.setValue(products))
    }

    get products$(): Observable<Product[]> {
        return this.value$
    }
}