import { store } from '../../shared/store';
import server from '../servers/user-server';
import userQueries from '../../redux/api-queries/user-queries';
import { mockUsers } from '../../shared/mock-users';
import { User } from '../../@types/user';

describe('users', () => {

  beforeAll(()=> {
    server.listen()
  })
  afterAll(()=>{
    server.close()
  })
  afterEach(() => server.resetHandlers())

  it('Should get all Users', async () => {
    await store.dispatch(userQueries.endpoints.getUsers.initiate(undefined));
    expect(store.getState().userReducer.queries['getUsers(undefined)']?.data).toMatchObject(mockUsers);
  });
  it('Should add new User test User with id: 4', async () => {
    const newUser: Partial<User> =  {  
      name: "New User",
      password: "passowrd4"
    };
    const result: any = await store.dispatch(userQueries.endpoints.addUser.initiate(newUser));
    expect(result.data).toMatchObject({...newUser, id: 4});
  });
  it('Should update existing User title to Updated User', async () => {
    const id = 2;
    const updates: Partial<User> =  {  
      password: "newPassword",
    };
    const result: any = await store.dispatch(userQueries.endpoints.updateUser.initiate({id, ...updates}));
    expect(result.data.password).toMatch("newPassword");
  });
  it('Should delete existing User', async () => {
    const id = 3;
    const result: any = await store.dispatch(userQueries.endpoints.deleteUser.initiate(id));
    expect(result.data).toBe(true);
  });
})

