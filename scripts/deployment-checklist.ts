import chalk from 'chalk'
import { execSync } from 'child_process'
import fs from 'fs'

const checkEnvironmentVariables = () => {
  const requiredVars = [
    'AZURE_AD_B2C_CLIENT_ID',
    'AZURE_AD_B2C_TENANT',
    'AZURE_AD_B2C_POLICY',
    'DATABASE_URL',
    'STORAGE_ACCOUNT_NAME',
    'KEY_VAULT_NAME'
  ]

  const missing = requiredVars.filter(varName => !process.env[varName])
  if (missing.length > 0) {
    console.error(chalk.red('❌ Missing environment variables:'))
    missing.forEach(varName => console.log(chalk.yellow(`   - ${varName}`)))
    return false
  }
  console.log(chalk.green('✅ Environment variables verified'))
  return true
}

const checkDependencies = () => {
  try {
    execSync('npm list --prod --json')
    console.log(chalk.green('✅ Dependencies verified'))
    return true
  } catch (error) {
    console.error(chalk.red('❌ Dependency check failed'))
    return false
  }
}

const checkBuild = () => {
  try {
    execSync('npm run build')
    console.log(chalk.green('✅ Build successful'))
    return true
  } catch (error) {
    console.error(chalk.red('❌ Build failed'))
    return false
  }
}

const main = async () => {
  console.log(chalk.blue('🚀 Starting deployment checklist...\n'))

  const checks = [
    checkEnvironmentVariables(),
    checkDependencies(),
    checkBuild()
  ]

  if (checks.every(check => check)) {
    console.log(chalk.green('\n✅ All checks passed! Ready for deployment.'))
  } else {
    console.log(chalk.red('\n❌ Some checks failed. Please fix the issues before deploying.'))
    process.exit(1)
  }
}

main() 