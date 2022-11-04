const getEnvVariable = (key: string) => {
  if (process.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }
  return process.env[key] || "";
};


export const isProd = () => {
  return getEnvVariable('NODE_ENV') === 'production'
}

export const isDev = () => {
  return getEnvVariable('NODE_ENV') === 'development'
}
