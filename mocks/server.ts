import { setupServer } from 'msw/node'
import { rest } from 'msw'

export const handlers = [
  rest.get('/api/requests', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          category: 'Vehicle',
          description: 'Test request',
          status: 'pending',
          priority: 'Medium',
          contactPerson: 'John Doe',
          createdAt: new Date().toISOString(),
        },
      ])
    )
  }),

  rest.post('/api/requests', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: 2,
        ...req.body,
        createdAt: new Date().toISOString(),
      })
    )
  }),

  rest.get('/api/admin/stats', (req, res, ctx) => {
    return res(
      ctx.json({
        totalRequests: 10,
        pendingRequests: 5,
        completedRequests: 3,
        requestsByCategory: [
          { name: 'Vehicle', value: 4 },
          { name: 'Maintenance', value: 6 },
        ],
        requestsByStatus: [
          { name: 'Pending', value: 5 },
          { name: 'Completed', value: 3 },
          { name: 'In Progress', value: 2 },
        ],
      })
    )
  }),
]

export const server = setupServer(...handlers) 