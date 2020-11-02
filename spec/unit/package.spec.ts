// tslint:disable-next-line:no-var-requires
const packageJson = require('../../package.json')

describe('Package JSON', () => {
  it('should contains all dependencies into bundledDependencies', () => {
    for (const dep in packageJson.dependencies) {
      expect(packageJson.bundledDependencies).toContain(dep)
    }
  })
  it('should contains all bundledDependencies into dependencies', () => {
    const dependencies = Object.keys(packageJson.dependencies)
    for (const dep of packageJson.bundledDependencies) {
      expect(dependencies).toContain(dep)
    }
  })
})
