import { store } from '../../shared/store';
import server from '../servers/product-server';
import productQueries from '../../redux/api-queries/product-queries';
import { mockProducts } from '../../shared/mock-products';
import { Product } from '../../@types/product';

describe('products', () => {

  beforeAll(()=> {
    server.listen()
  })
  afterAll(()=>{
    server.close()
  })
  afterEach(() => server.resetHandlers())

  it('Should get all products', async () => {
    await store.dispatch(productQueries.endpoints.getProducts.initiate(undefined));
    expect(store.getState().productReducer.queries['getProducts(undefined)']?.data).toMatchObject(mockProducts);
  });

  it('Should get one product object by id = 8', async () => {
    const id: number = 8;
    await store.dispatch(productQueries.endpoints.getProductById.initiate(id));
    expect(store.getState().productReducer.queries[`getProductById(${id})`]?.data).toMatchObject(mockProducts[0]);
  });

  it('Should get an array with product id = 8 inside, by passed string query = nuevo', async () => {
    const query: string = "nuevo";
    await store.dispatch(productQueries.endpoints.getFilteredProductsByTitle.initiate(query));
    expect(store.getState().productReducer.queries[`filterProductsByTitle("nuevo")`]?.data).toContainEqual(mockProducts[0]);
  });

  it('Should add new product test product with id: 11', async () => {
    const newProduct: Partial<Product> =  {  
      title: "New Product",
    };
    const result: any = await store.dispatch(productQueries.endpoints.addProduct.initiate(newProduct));
    expect(result.data).toMatchObject({...newProduct, id: 11});
  });
  it('Should update existing product title to Updated Product', async () => {
    const _id = "10";
    const updates: Partial<Product> =  {  
      title: "Updated Product",
    };
    const result: any = await store.dispatch(productQueries.endpoints.updateProduct.initiate({_id, ...updates}));
    expect(result.data.title).toMatch("Updated Product");
  });
  it('Should delete existing product', async () => {
    const _id = "10";
    const result: any = await store.dispatch(productQueries.endpoints.deleteProduct.initiate(_id));
    expect(result.data).toBe(true);
  });
})

