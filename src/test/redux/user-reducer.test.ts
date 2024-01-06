import { store } from '../../shared/store';
import server from '../servers/user-server';
import userQueries from '../../redux/api-queries/user-queries';
import { mockUsers } from '../../shared/mock-users';
import { User } from '../../@types/user';
import { token } from '../../shared/mock-auth';

type Response = {
  data: {msg : string} | User | User[]
}

describe('users', () => {

  beforeAll(()=> {
    server.listen()
  })
  afterAll(()=>{
    server.close()
  })
  afterEach(() => server.resetHandlers())

  it('getUsers - should get all Users', async () => {
    const response: Response = await store.dispatch(userQueries.endpoints.getUsers.initiate(JSON.stringify(token)));
    expect(response.data).toMatchObject(mockUsers);
  });

  test('updateUser - should update existing User name to Updated User', async () => {
    const _id = "2";
    const updates: Partial<User> =  {  
      name: "Updated User",
    };
    const response: Response = await store.dispatch(userQueries.endpoints.updateUser.initiate({_id, body: updates, token: JSON.stringify(token)}));
    expect(response.data.name).toEqual("Updated User");
  });

  test('deleteUser - should delete existing User', async () => {
    const _id = "3";
    const response: Response = await store.dispatch(userQueries.endpoints.deleteUser.initiate({_id, token: JSON.stringify(token)}));
    expect(response.data).toBe(true);
  });
})

