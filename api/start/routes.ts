/*
|--------------------------------------------------------------------------
| routers file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    messages: 'server ok',
  }
})

router
  .group(() => {
    router
      .group(() => {
        router.get('/', 'ExpensesController.index')
        router.post('/', 'ExpensesController.store')
        router.put('/:id', 'ExpensesController.update')
        router.delete('/:id', 'ExpensesController.destroy')
      })
      .prefix('expenses')
    router
      .group(() => {
        router.get('', 'CategoriesController.index')
        router.get('/:id', 'ExpenseController.show')
      })
      .prefix('categories')
  })
  .prefix('api')
