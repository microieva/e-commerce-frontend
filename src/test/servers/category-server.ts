import {rest} from 'msw';
import {setupServer} from 'msw/node';

import {mockCategories} from '../../shared/mock-categories';

export const handlers = [
  rest.get('https://e-commerce-api-atbv.onrender.com/api/v1/categories', (req, res, ctx) =>{
    return res(ctx.json(mockCategories));
  }),
  rest.get(`https://e-commerce-api-atbv.onrender.com/api/v1/categories/:categoryId`, (req, res, ctx) =>{
    const { categoryId } = req.params;
    const mockCategory = mockCategories.find(c=> c._id === categoryId);

    if(mockCategory) {
      return res(
        ctx.json(mockCategory)
        )
      } else {
      return res(
        ctx.json("Category Not Found")
        )
      }
    }),
    rest.post('https://e-commerce-api-atbv.onrender.com/api/v1/categories', async (req, res, ctx) => {
      const body = await req.json();
      const response = {
        ...body,
        _id: "4"
      }
      return res(
        ctx.status(200),
        ctx.json(response),
      );
    }),
    rest.delete('https://e-commerce-api-atbv.onrender.com/api/v1/categories/:categoryId', async (req, res, ctx)=>{
      const { categoryId } = req.params;
      if(mockCategories.find(c=> c._id === categoryId)) {
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