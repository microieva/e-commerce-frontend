import { store } from '../../shared/store';
import server from '../servers/product-server';
import productQueries from '../../redux/api-queries/product-queries';
import { mockProducts } from '../../shared/mock-products';
import { Product } from '../../@types/product';
import { token } from '../../shared/mock-auth';

type Response = {
  data: Product[] | Product
}

beforeAll(()=> {
  server.listen()
})
afterAll(()=>{
  server.close()
})
afterEach(() => server.resetHandlers())

describe('products', () => {

  test('getProducts - should return products array', async () => {
    const { data } = await store.dispatch(productQueries.endpoints.getProducts.initiate(undefined));
    expect(data).toEqual(mockProducts);
  });

  test('getProductById - should get one product object by id = 8', async () => {
    const id: string = "8";
    const response: Response = await store.dispatch(productQueries.endpoints.getProductById.initiate(id));
    expect(response.data._id).toEqual(id);
  });

  test('createProduct - should create new product', async () => {
    const newProduct: Partial<Product> =  {
      title: "New Product",
      price: 987,
      categoryId: "1",
      images: [''],
      description: "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
  }
    const response: Response = await store.dispatch(productQueries.endpoints.createProduct.initiate({token: JSON.stringify(token), body: newProduct}));
    expect(response.data.title).toEqual(newProduct.title);
  });

  test('updateProduct - should update existing product title to Updated Product', async () => {
    const _id = "10";
    const updates: Partial<Product> =  {  
      title: "Updated Product",
    };
    const response: Response = await store.dispatch(productQueries.endpoints.updateProduct.initiate({productId: _id, body: updates, token: JSON.stringify(token)}));
    expect(response.data.title).toMatch("Updated Product");
  });

  test('deleteProduct - should delete existing product', async () => {
    const _id = "8";
    const response: Response = await store.dispatch(productQueries.endpoints.deleteProduct.initiate({productId: _id, token: JSON.stringify(token)}));
    expect(response.data).toBe(true);
  });
})


