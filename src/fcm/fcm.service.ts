import { Injectable, Logger } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import * as path from 'path';
@Injectable()
export class FcmService {
  private readonly logger = new Logger(FcmService.name);
  constructor() {
    if (firebaseAdmin.apps.length === 0) {
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(
          path.join(__dirname, '..', '..', 'firebase-admin-token.json'),
        ),
      });
    }
  }

  private readonly options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24,
  };

  private readonly optionsSilent = {
    priority: 'high',
    timeToLive: 60 * 60 * 24,
    content_available: true,
  };

  async sendNotification(
    deviceIds: Array<string>,
    payload: firebaseAdmin.messaging.MessagingPayload,
    silent: boolean,
  ) {
    if (deviceIds.length == 0) {
      throw new Error('You provide an empty device ids list!');
    }

    let result = null;
    try {
      result = await firebaseAdmin
        .messaging()
        .sendToDevice(
          deviceIds,
          payload,
          silent ? this.optionsSilent : this.options,
        );
    } catch (error) {
      this.logger.error(error.message, error.stackTrace, 'fcm-nestjs');
      throw error;
    }
    return result;
  }

  async sendToTopic(
    topic: 'all' | string,
    payload: firebaseAdmin.messaging.MessagingPayload,
    silent: boolean,
  ) {
    if (!topic && topic.trim().length === 0) {
      throw new Error('You provide an empty topic name!');
    }

    let result = null;
    try {
      result = await firebaseAdmin
        .messaging()
        .sendToTopic(
          topic,
          payload,
          silent ? this.optionsSilent : this.options,
        );
    } catch (error) {
      this.logger.error(error.message, error.stackTrace, 'fcm-nestjs');
      throw error;
    }
    return result;
  }
}
