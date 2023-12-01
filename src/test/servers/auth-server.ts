import {rest} from 'msw';
import {setupServer} from 'msw/node';

import { mockRequest, mockResponse, mockUser } from '../../shared/mock-auth';
import { Token } from 'graphql';

export const handlers = [
  rest.post('https://api.escuelajs.co/api/v1/auth/login', async (req, res, ctx)=>{
    const { email, password } = await req.json();

    if (mockRequest.email === email && mockRequest.password === password) {
      return res(
        ctx.json({access_token: mockResponse.access_token, refresh_token: mockResponse.refresh_token})
      )
    } else {
      return res(
        ctx.status(401)
      );
    }
  }),
  rest.get('https://api.escuelajs.co/api/v1/auth/profile', async (req, res, ctx) => {
    const access_token = req.headers.get('Authorization'); 

    if (access_token === `Bearer ${mockResponse.access_token}`) {
        return res(
            ctx.json(mockUser)
        );
    } else {
        return res(
            ctx.status(401)
        );
    }
  })
];

const server = setupServer(...handlers);
export default server;