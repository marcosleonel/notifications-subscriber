import webPush from 'web-push'
import { PushSubscription, RequestOptions } from 'web-push'
import { Logger } from 'winston'
/*
import dotenv from 'dotenv'

dotenv.config()

const vapidKeyPublic: string = process.env.VAPID_KEY_PUBLIC as string || ''
const vapidKeyPrivate: string = process.env.VAPID_KEY_PRIVATE as string || '' */

class PushNotifications {
  defaultOptions: RequestOptions = {}
  vapidKeyPrivate: string = ''
  vapidKeyPublic: string = ''
  logger: Logger

  constructor(logger: Logger, vapidKeyPrivate: string, vapidKeyPublic: string) {
    this.logger = logger
    this.vapidKeyPrivate = vapidKeyPrivate
    this.vapidKeyPublic = vapidKeyPublic
  }

  send(
    subject: string,
    subscription: PushSubscription,
    payload: string | Buffer | null,
    options = this.defaultOptions
  ) {
    const notificationOptions = {...options}
    notificationOptions.vapidDetails = {
      subject,
      publicKey: this.vapidKeyPublic,
      privateKey: this.vapidKeyPrivate,
    }

    webPush
      .sendNotification(
        subscription,
        payload,
        options,
      )
      .catch((error) => {
        console.error(`[PushNotification] Unable to send notification: ${error}`)
      })
  }
}

export default PushNotifications
