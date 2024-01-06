import server from "../servers/category-server";
import { mockCategories } from "../../shared/mock-categories";
import { store } from "../../shared/store";
import categoryQueries from "../../redux/api-queries/category-queries";
import { Category } from "../../@types/product";
import { token } from '../../shared/mock-auth';

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
    const response = await store.dispatch(categoryQueries.endpoints.getCategories.initiate(JSON.stringify(token)));
    expect(response).toHaveProperty("data");
    expect(response.data).toEqual(mockCategories);
  }),

  test('getCategoryById - should get one category object with id = 1', async () => {
    const _id: string = "1";
    const response = await store.dispatch(categoryQueries.endpoints.getCategoryById.initiate(_id));
    //expect(store.getState().categoryReducer.queries[`getCategoryById(${_id})`]?.data).toMatchObject(mockCategories[0]);
    expect(response).toHaveProperty("data");
    expect(response.data).toEqual(mockCategories[0]);
  }),

  test('createCategory - should create new category', async () => {
    const newCategory: Partial<Category> =  {
      name: "New Category",
      image: "string"
    }
    const response: Response = await store.dispatch(categoryQueries.endpoints.createCategory.initiate({token: JSON.stringify(token), body: newCategory}));
    expect(response.data.name).toEqual(newCategory.name);
  });

  test('deleteCategory - should delete existing category', async () => {
    const _id = "1";
    const response: Response = await store.dispatch(categoryQueries.endpoints.deleteCategory.initiate({categoryId: _id, token: JSON.stringify(token)}));
    expect(response.data).toBe(true);
  });
})