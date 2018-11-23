const Env = use('Env')

module.exports = {
  webhooks: {
    contact: Env.get('DISCORD_WEBHOOK_CONTACT_URL')
  }
}
