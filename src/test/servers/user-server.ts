import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { mockUsers } from '../../shared/mock-users';

export const handlers = [
  rest.get('https://api.escuelajs.co/api/v1/users', (req, res, ctx) =>{
    return res(ctx.json(mockUsers))
  }),
  rest.post('https://api.escuelajs.co/api/v1/users/', async (req, res, ctx) => {
    const body = await req.json();
    return res(
      ctx.status(200),
      ctx.json({ ...body, id: 4 }),
    );
  }),
  rest.put('https://api.escuelajs.co/api/v1/users/:id', async (req, res, ctx) => {
    const {id} = req.params;
    const body = await req.json();
    const mockUserToUpdate = mockUsers.find(u => u.id === Number(id));
    return res(
      ctx.status(200),
      ctx.json({...mockUserToUpdate, password: body.password}),
    );
  }),
  rest.delete('https://api.escuelajs.co/api/v1/users/:id', async (req, res, ctx)=>{
    const {id} = req.params;
    if(mockUsers.find(u => u.id === Number(id))) {
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
