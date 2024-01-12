import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { mockUsers } from '../../shared/mock-users';
import { adminToken, token } from '../../shared/mock-auth';

export const handlers = [
  rest.get('https://e-commerce-api-atbv.onrender.com/api/v1/users', (req, res, ctx) =>{
    const reqToken = (req.headers.get('authorization'))?.toString().match(adminToken);

    if (reqToken) {
      return res(ctx.json(mockUsers))
    }
  }),

  rest.put('https://e-commerce-api-atbv.onrender.com/api/v1/users/:userId', async (req, res, ctx) => {
    const reqToken = (req.headers.get('authorization'))?.toString().match(token);
    const { userId } = req.params;
    const body = await req.json();
    const mockUserToUpdate = mockUsers.find(u => u._id === userId);

    if (reqToken && mockUserToUpdate) {
      return res(
        ctx.status(200),
        ctx.json({...mockUserToUpdate, name: body.name})
      );
    }
  }),

  rest.delete('https://e-commerce-api-atbv.onrender.com/api/v1/users/:userId', async (req, res, ctx)=>{
    const reqToken = (req.headers.get('authorization'))?.toString().match(token);
    const { userId } = req.params;

    if(reqToken && mockUsers.find(u => u._id === userId)) {
      return res(
        ctx.json(true)
      )
    } else {
        return res(
          ctx.json(false)
        )
    }   
  }),
]

const server = setupServer(...handlers);
export default server;
