import { store } from '../../shared/store';
import server from '../servers/auth-server';
import authQueries from '../../redux/api-queries/auth-queries';
import { mockUser, mockRequest, token } from '../../shared/mock-auth';
import { User } from '../../@types/user';

describe('authentification', () => {

  beforeAll(()=> {
    server.listen()
  })
  afterEach(() => 
    server.resetHandlers()
  )
  afterAll(()=>{
    server.close()
  })

  test('login - should return token', async () => {
    const response = await store.dispatch(authQueries.endpoints.login.initiate(mockRequest));
    expect(response).toHaveProperty('data');
    if ('data' in response) {
      expect(response.data).toEqual(token);
    }
  });

  test('getUser - should return user details', async ()=>{
    const response = await store.dispatch(authQueries.endpoints.getUser.initiate(JSON.stringify(token)));
    expect(response.data).toMatchObject(mockUser);
  })

  test('signup - should create a new User ', async () => {
    const newUser: Partial<User> =  {  
      name: "Test User",
      email: "test.user@email.com",
      password: "passowrd4"
    };
    const response = await store.dispatch(authQueries.endpoints.createUser.initiate(newUser));
    expect(response).toHaveProperty('data');
    if ('data' in response) {
      expect(response.data).toEqual(token);
    }
  });
})