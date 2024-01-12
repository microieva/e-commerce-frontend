import server from "../servers/category-server";
import { mockCategories } from "../../shared/mock-categories";
import { store } from "../../shared/store";
import categoryQueries from "../../redux/api-queries/category-queries";
import { Category } from "../../@types/product";
import { adminToken } from '../../shared/mock-auth';

type Response = {
  data: Category
}

describe('categories', () => {

  beforeAll(()=> {
    server.listen()
  })
  afterAll(()=>{
    server.close()
  })
  afterEach(() => server.resetHandlers())

  test('getCategories - should get all categories', async () => {
    const response = await store.dispatch(categoryQueries.endpoints.getCategories.initiate(JSON.stringify(adminToken)));
    expect(response).toHaveProperty("data");
    expect(response.data).toEqual(mockCategories);
  }),

  test('getCategoryById - should get one category object with id = 1', async () => {
    const _id: string = "1";
    const response = await store.dispatch(categoryQueries.endpoints.getCategoryById.initiate(_id));
  
    expect(response).toHaveProperty("data");
    expect(response.data).toEqual(mockCategories[0]);
  }),

  test('createCategory - should create new category', async () => {
    const newCategory: Partial<Category> =  {
      name: "New Category",
      image: "string"
    }
    const response: Response = await store.dispatch(categoryQueries.endpoints.createCategory.initiate({token: JSON.stringify(adminToken), body: newCategory}));
    expect(response.data.name).toEqual(newCategory.name);
  });

  test('deleteCategory - should delete existing category', async () => {
    const categoryId = "1";
    const response: Response = await store.dispatch(categoryQueries.endpoints.deleteCategory.initiate({categoryId, token: JSON.stringify(adminToken)}));
    expect(response.data).toBe(true);
  });
})