import {rest} from 'msw';
import {setupServer} from 'msw/node';

import { mockRequest, mockResponse, mockUser, token } from '../../shared/mock-auth';

export const handlers = [
  rest.post('https://e-commerce-api-atbv.onrender.com/api/v1/auth/login', async (req, res, ctx)=>{
    const { email, password } = await req.json();

    if (mockRequest.email === email && mockRequest.password === password) {
      return res(ctx.json(token))
    } 
  }),
  rest.get('https://e-commerce-api-atbv.onrender.com/api/v1/auth/profile', async (req, res, ctx) => {
    const token = req.headers.get('Authorization'); 

    if (token === `Bearer ${mockResponse.token}`) {
        return res(
            ctx.json(mockUser)
        );
    } else {
        return res(
            ctx.status(401)
        );
    }
  }),
  rest.post('https://e-commerce-api-atbv.onrender.com/api/v1/auth/signup', async (req, res, ctx) => {
    const newUser = await req.json();; 

    if (newUser) {
      return res(
        ctx.json(token)
      )
    } else {
        return res(
            ctx.status(401)
        );
    }
  })
];

const server = setupServer(...handlers);
export default server;