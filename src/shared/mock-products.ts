import { Product } from "../@types/product";

export const mockProducts: Product[] = [
  {
      _id: "8",
      title: "nuevo title",
      price: 987,
      category: {
        _id: "1",
        name: 'string',
        image: 'string'

      },
      images: [''],
      description: "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
  },
  {
      _id: "9",
      title: "Bespoke Wooden Shirt",
      price: 551,
      category: {
        _id: "1",
        name: 'string',
        image: 'string'

      },
      images: [''],
      description: "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
  },
  {
      _id: "10",
      title: "Gorgeous Soft Hat",
      price: 635,
      category: {
        _id: "2",
        name: 'string',
        image: 'string'

      },
      images: [''],
      description: "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
  }
]