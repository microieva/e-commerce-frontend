import {rest} from 'msw';
import {setupServer} from 'msw/node';

import {mockCategories} from '../../shared/mock-categories';
import { mockProducts } from '../../shared/mock-products';

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
  rest.get(`https://api.escuelajs.co/api/v1/categories/:categoryId/products`, (req, res, ctx) => {
    const { categoryId } = req.params;
    const queryResult = mockProducts.filter(p =>p.category._id === categoryId);

    if(queryResult.length > 0) {
      return res(
        ctx.json(queryResult)
      )
    } else {
      return res(
        ctx.json("Products Not Found")
      )
    }
  })
]

const server = setupServer(...handlers);
export default server;