import { Category } from "../types/category.type";

export const categories: Category[] = [

    {
        id:1,
        category: "Men"
    },
    {
        id:2,
        category: "Women"
    },
    {
        id:3,
        category: "Kids"
    },
    {
        id:4,
        category: "Offers"
    },
    {
        id:5,
        category: "Party Wear",
        parent_category_id: 1
    },
    {
        id:6,
        category: "Foot Wear",
        parent_category_id: 2
    },
    {
        id:7,
        category: "Acessories",
        parent_category_id: 2
    },
    {
        id:8,
        category: "Clothing",
        parent_category_id: 3
    },
    {
        id:9,
        category: "Hats",
        parent_category_id: 4
    }
]

