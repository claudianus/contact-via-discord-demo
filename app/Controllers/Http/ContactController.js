'use strict'

const axios = use('axios')
const Config = use('Config')
const { validate } = use('Validator')

class ContactController {
  async view({view}) {
    return view.render('contact')
  }

  async send({request, session, response}) {
    const body = request.post()
    const rules = {
      name: 'required|string|min:1|max:50',
      email: 'email|min:1|max:100',
      content: 'required|min:1|max:1800|string'
    }
    const validation = await validate(body, rules)
    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }
    axios.post(Config.get('discord.webhooks.contact'), {
      content: `__**New Contact**__ from **${body.name} (${body.email})**\n\`\`\`${body.content}\`\`\``
    })
    session.flash({success: "Sent!"})
    return response.redirect('back')
  }
}

module.exports = ContactController
