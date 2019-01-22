/**
 * @description Inclusion guard to ensure core module is only loaded once.
 * See angular style guide 'Prevent re-import of the core module'
 * https://angular.io/guide/styleguide#prevent-re-import-of-the-core-module
 */
export class ILoadOnce {
  constructor(targetModule: any) {
    if (targetModule) {
      throw new Error(
        `${
          targetModule.constructor.name
        } has already been loaded. Import this module in the AppModule only`
      );
    }
  }
}
