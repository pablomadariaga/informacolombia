/*
|--------------------------------------------------------------------------
| routers file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
| Here, we organize the endpoints for expenses and categories
| within an API prefix for better structure.
|
*/

import router from '@adonisjs/core/services/router'

// Root route to check server status
router.get('/', async () => {
  return {
    message: 'server ok',
  }
})

// Grouped routes under 'api' prefix
router
  .group(() => {
    // Routes for expenses operations
    router
      .group(() => {
        router.get('/', 'ExpensesController.index') // Fetch all expenses
        router.post('/', 'ExpensesController.store') // Create a new expense
        router.put('/:id', 'ExpensesController.update') // Update an existing expense by ID
        router.delete('/:id', 'ExpensesController.destroy') // Delete an expense by ID
      })
      .prefix('expenses') // Prefix for expense routes

    // Routes for category operations
    router
      .group(() => {
        router.get('', 'CategoriesController.index') // Fetch all categories
        router.get('/:id', 'CategoriesController.show') // Fetch a single category by ID
      })
      .prefix('categories') // Prefix for category routes
  })
  .prefix('api') // Prefix for all grouped API routes
