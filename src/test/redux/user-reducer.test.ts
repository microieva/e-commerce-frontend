import { store } from '../../shared/store';
import server from '../servers/user-server';
import userQueries from '../../redux/api-queries/user-queries';
import { mockUsers } from '../../shared/mock-users';
import { mockUser, mockResponse } from '../../shared/mock-auth';
import { User } from '../../@types/user';
import { token } from '../../shared/mock-auth';

describe('users', () => {

  beforeAll(()=> {
    server.listen()
  })
  afterAll(()=>{
    server.close()
  })
  afterEach(() => server.resetHandlers())

  it('Should get all Users', async () => {
    const response = await store.dispatch(userQueries.endpoints.getUsers.initiate(token));
    expect(response.data).toMatchObject(mockUsers);
  });

  it('Should update existing User title to Updated User', async () => {
    const _id = "2";
    const updates: Partial<User> =  {  
      password: "newPassword",
    };
    const response = await store.dispatch(userQueries.endpoints.updateUser.initiate({_id, body: updates, token}));
    expect(response).data.password.toMatch("newPassword");
  });

  it('Should delete existing User', async () => {
    const _id = "3";
    const response = await store.dispatch(userQueries.endpoints.deleteUser.initiate({_id, token}));
    expect(response).toBe(true);
  });
})

