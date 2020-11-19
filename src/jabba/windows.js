const { spawnSync } = require('child_process')

const installerUri = 'https://github.com/shyiko/jabba/raw/master/install.ps1'

const installerScript = `
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-Expression (
  Invoke-WebRequest ${installerUri} -UseBasicParsing
).Content
`.trim()

async function installJabba () {
  const { error } = spawnSync('powershell', {
    stdio: 'inherit',
    input: installerScript
  })

  if (error) {
    throw error
  }
}

function jabbaPath () {
  const homeDirectory = this._deps.process.env.HOME

  return this._deps.path.join(homeDirectory, '.jabba', 'bin', 'jabba')
}

const windowsImpl = {
  installJabba,
  jabbaPath
}

module.exports = windowsImpl
