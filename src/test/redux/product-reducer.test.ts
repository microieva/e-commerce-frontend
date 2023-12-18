import { store } from '../../shared/store';
import server from '../servers/product-server';
import productQueries from '../../redux/api-queries/product-queries';
import { mockProducts } from '../../shared/mock-products';
import { Product } from '../../@types/product';
import { token } from '../../shared/mock-auth';

describe('products', () => {

  beforeAll(()=> {
    server.listen()
  })
  afterAll(()=>{
    server.close()
  })
  afterEach(() => server.resetHandlers())

  it('Should get all products', async () => {
    const response = await store.dispatch(productQueries.endpoints.getProducts.initiate(undefined));
    expect(response.data).toMatchObject(mockProducts);
  });
  it('Should get one product object by id = 8', async () => {
    const id: string = "8";
    const response = await store.dispatch(productQueries.endpoints.getProductById.initiate(id));
    expect(response.data).toMatchObject(mockProducts[0]);
  });

  it('Should get an array with product id = 8 inside, by passed string query = nuevo', async () => {
    const query: string = "nuevo";
    const response = await store.dispatch(productQueries.endpoints.getFilteredProductsByTitle.initiate(query));
    expect(response.data).toContainEqual(mockProducts[0]);
  });

  it('Should create new product', async () => {
    const newProduct: Partial<Product> =  {
      title: "New Product",
      price: 987,
      categoryId: "1",
      images: [''],
      description: "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
  }
    await store.dispatch(productQueries.endpoints.createProduct.initiate({token, body: newProduct}));
    //expect(response).data.toMatchObject(newProduct);
    expect(store.getState().productReducer.mutations['createProduct(newProduct)']).toMatchObject(newProduct);
  });

  it('Should update existing product title to Updated Product', async () => {
    const _id = "10";
    const updates: Partial<Product> =  {  
      title: "Updated Product",
    };
    const response = await store.dispatch(productQueries.endpoints.updateProduct.initiate({productId: _id, body: updates, token}));
    expect(response).data.title.toMatch("Updated Product");
  });

  it('Should delete existing product', async () => {
    const _id = "10";
    const response = await store.dispatch(productQueries.endpoints.deleteProduct.initiate({productId: _id, token}));
    expect(response).data.toBe(true);
  });
})


