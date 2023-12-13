import { store } from '../../shared/store';
import server from '../servers/user-server';
import userQueries from '../../redux/api-queries/user-queries';
import { mockUsers } from '../../shared/mock-users';
import { mockUser, mockResponse } from '../../shared/mock-auth';
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
  /*
  MISSING TOKEN
  it('Should update existing User title to Updated User', async () => {
    const _id = "2";
    const updates: Partial<User> =  {  
      password: "newPassword",
    };
    const result: any = await store.dispatch(userQueries.endpoints.updateUser.initiate({_id, ...updates}));
    expect(result.data.password).toMatch("newPassword");
  });*/
  /*it('Should delete existing User', async () => {
    const _id = "3";
    const result: any = await store.dispatch(userQueries.endpoints.deleteUser.initiate(_id));
    expect(result.data).toBe(true);
  });*/
})

