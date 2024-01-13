import { store } from '../../shared/store';
import server from '../servers/order-server';
import orderQueries from '../../redux/api-queries/order-queries';
import { mockOrders } from '../../shared/mock-orders';
import { mockOrderItems } from '../../shared/mock-items';
import { adminToken, token } from '../../shared/mock-auth';
import { Order } from '../../@types/cart';


beforeAll(()=> {
  server.listen()
})
afterAll(()=>{
  server.close()
})
afterEach(() => server.resetHandlers())

describe('orders', () => {

  test('getAllOrders - admin only', async () => {
    const { data } = await store.dispatch(orderQueries.endpoints.getOrders.initiate({token: JSON.stringify(token)}));
    expect(data).toEqual(mockOrders);
  });

  test("getOrdersByUserId - should return 1 user's orders", async () => {
    const userId: string = "2";
    const { data } = await store.dispatch(orderQueries.endpoints.getOrdersByUserId.initiate({token: JSON.stringify(token), userId}));
    const userOrders = mockOrders.filter(order => order.userId === userId);
    expect(data).toEqual(userOrders);
  });

  test("getOrderItems - should items array from 1 order", async () => {
    const orderId: string = "2";
    const { data } = await store.dispatch(orderQueries.endpoints.getOrderItems.initiate({token: JSON.stringify(token), orderId}));
    const orderItems = mockOrderItems.filter(item => item.orderId === orderId);
    expect(data).toEqual(orderItems);
  });

  test('createOrder - should create new order', async () => {
    const orderRequest = [
        {
            id: "10",
            quantity: 2
        }
    ]
    const response = await store.dispatch(orderQueries.endpoints.createOrder.initiate({userId: "2", token: JSON.stringify(token), body: orderRequest}));
    expect(response).toHaveProperty('data');
    if ('data' in response) {
      expect(response.data).toBeTruthy();
    }
  });

  test('updateOrder - should update existing order', async () => {
    const orderId = "1";
    const updates: Partial<Order> =  {  
      paid: true,
    };
    const response = await store.dispatch(orderQueries.endpoints.updateOrder.initiate({orderId, body: updates, token: JSON.stringify(token)}));
    expect(response).toHaveProperty('data');
    if ('data' in response) {
      expect(response.data.paid).toBe(true);
    }
  });

  test('deleteOrder - should delete existing order', async () => {
    const orderId = "2";
    const response = await store.dispatch(orderQueries.endpoints.deleteOrder.initiate({orderId, token: JSON.stringify(token)}));
    expect(response).toHaveProperty('data');
    if ('data' in response) {
      expect(response.data).toBe(true);
    }
  });

  test('deleteUserOrders - should delete user orders', async () => {
    const userId = "3";
    const response = await store.dispatch(orderQueries.endpoints.deleteUserOrders.initiate({userId, token: JSON.stringify(token)}));
    expect(response).toHaveProperty('data');
    if ('data' in response) {
      expect(response.data).toBe(true)
    }
  });
})


