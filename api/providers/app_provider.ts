import { CategoryRepositoryContract } from '#contracts/caterory_repository_contract'
import { CategoryServiceContract } from '#contracts/caterory_service_contract'
import type { ApplicationService } from '@adonisjs/core/types'

/**
 * Provider for binding services and repositories to the application container.
 */
export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container.
   * This method is called on application start to register dependencies.
   */
  register() {}

  /**
   * Boot the container bindings.
   * Initializes and binds the CategoryService and CategoryRepository contracts.
   */
  async boot() {
    const { CategoryService } = await import('#services/category_service')
    const { CategoryRepository } = await import('#repositories/category_repository')

    // Bind CategoryRepositoryContract to CategoryRepository implementation
    this.app.container.bind(CategoryRepositoryContract, () => {
      return this.app.container.make(CategoryRepository)
    })

    // Bind CategoryServiceContract to CategoryService implementation
    this.app.container.bind(CategoryServiceContract, () => {
      return this.app.container.make(CategoryService)
    })
  }

  /**
   * Method triggered once the application has booted.
   */
  async start() {}

  /**
   * Method triggered when the application process has fully started.
   */
  async ready() {}

  /**
   * Method called before shutting down the application.
   * Used to perform any cleanup or release resources.
   */
  async shutdown() {}
}
