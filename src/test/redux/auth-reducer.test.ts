import { store } from '../../shared/store';
import server from '../servers/auth-server';
import authQueries from '../../redux/api-queries/auth-queries';
import { mockUser, mockResponse } from '../../shared/mock-auth';
import { LoginRequest } from '../../@types/auth';
import { User } from '../../@types/user';

describe('authentification', () => {

  beforeAll(()=> {
    server.listen()
  })
  afterAll(()=>{
    server.close()
  })
  afterEach(() => server.resetHandlers())

  it('Should login the requesting user by recieving token', async () => {
    const loginRequest: LoginRequest =  {  
      email: 'ieva@email.com',
      password: 'admin'
    };
    const response = await store.dispatch(authQueries.endpoints.login.initiate({email: loginRequest.email, password: loginRequest.password}));
    expect(response).data.toMatchObject(mockResponse);
  });
  it('Should get logged in user', async ()=>{
    const token: string = mockResponse.token;
    const response = await store.dispatch(authQueries.endpoints.getUser.initiate(token));
    expect(response).data.toMatchObject(mockUser);
  })

  it('Should add new User with id: 4', async () => {
    const newUser: Partial<User> =  {  
      name: "New User",
      password: "passowrd4"
    };
    const response = await store.dispatch(authQueries.endpoints.createUser.initiate(newUser));
    expect(response).data.toMatchObject({...newUser, _id: '4'});
  });
})