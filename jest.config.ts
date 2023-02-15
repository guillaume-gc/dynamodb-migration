const config = {
  verbose: true,
  setupFiles: ['<rootDir>/.jest/setupBeforeEnv.ts'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setupAfterEnv.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      // required due to custom location of tsconfig.json configuration file
      // https://kulshekhar.github.io/ts-jest/docs/getting-started/options/tsconfig
      { tsconfig: './test/tsconfig.json' },
    ],
  },
}

export default config
