import { CategoryRepositoryContract } from '#contracts/caterory_repository_contract'
import { CategoryServiceContract } from '#contracts/caterory_service_contract'
import type { ApplicationService } from '@adonisjs/core/types'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {}

  /**
   * The container bindings have booted
   */
  async boot() {
    const { CategoryService } = await import('#services/category_service')
    const { CategoryRepository } = await import('#repositories/category_repository')
    this.app.container.bind(CategoryRepositoryContract, () => {
      return this.app.container.make(CategoryRepository)
    })
    this.app.container.bind(CategoryServiceContract, () => {
      return this.app.container.make(CategoryService)
    })
  }

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {}
}
